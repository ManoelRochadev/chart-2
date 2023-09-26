import express from "express";
import fs from 'fs';
import csv from 'csv-parser';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import path from "path";
import { Tail } from "tail";
import child_process from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// Caminho do arquivo CSV a ser processado
const inputPath = path.join(__dirname, '../../MM-DIRECT/src/datasets/datasets.csv');
const pathCpu = path.join(__dirname, 'system_monitoring.csv');

// Variáveis de controle
let total = 0; // Contador de linhas no CSV
let database_startup_time = 0; // Armazena o tempo de inicialização do banco de dados
const contagemComandos = []; // Armazena os arrays de contagem de comandos por segundo
let arrayParaVerificarSeJaFoiEnviado = []; // Armazena os arrays para verificação de envio
let lendoArquivo = false; // Variável de controle para verificar se o arquivo está sendo lido

// Criar um servidor WebSocket
const wss = new WebSocketServer({ server }, () => {
  console.log(`
  rota para o dataset de comandos por segundo: ws://localhost:8080/data
  rota para o dataset de uso de cpu: ws://localhost:8080/cpu
  `);
});


const processaCSV = async (ws, inputPath) => {
  fs.createReadStream(inputPath, {
    start: total,
  })
    .pipe(csv())
    .on('data', (row) => {
      total++;
      lendoArquivo = true;

      // Processar cada linha do CSV
      if (total === 1) {
        // Obter o tempo de inicialização do banco de dados a partir da segunda linha
        database_startup_time = parseInt(row.startTime);
      } else if (total >= 3) {
        if (row.type !== '0' && !isNaN(row.finishTime)) {
          // Calcular o tempo em segundos a partir do tempo de término e do tempo de inicialização
          const tempoTermino = parseInt(row.finishTime);
          const tempoEmSegundos = Math.floor((tempoTermino - database_startup_time) / 1000000);

          if (tempoEmSegundos >= 0) {
            // Verificar se o array para esse segundo já existe
            const entryIndex = contagemComandos.findIndex(entry => entry[0] === tempoEmSegundos);

            if (entryIndex === -1) {
              // Se não existe, adicionar um novo array de contagem
              contagemComandos.push([tempoEmSegundos, 1]);
            } else {
              // Se existe, incrementar a contagem de comandos
              contagemComandos[entryIndex][1]++;
            }
          }
        }
      }

      // Verificar se o tamanho do array aumentou e enviar o penúltimo elemento apenas uma vez
      for (let i = 0; i < contagemComandos.length; i++) {
        if (contagemComandos.length > arrayParaVerificarSeJaFoiEnviado.length) {
          if (i === contagemComandos.length - 2) {
            arrayParaVerificarSeJaFoiEnviado.push(contagemComandos[i]);
            ws.send(JSON.stringify(contagemComandos[i]));
          }
        }
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      // Enviar o último elemento do array para a conexão WebSocket
      // ws.send(JSON.stringify(contagemComandos[contagemComandos.length - 1]));
      lendoArquivo = false;
    });
}

wss.on('connection', async (ws, req) => {
  console.log('Client connected');

  if (req.url === '/data') {
    const tail = new Tail(inputPath);

    await processaCSV(ws, inputPath);

    tail.on("line", function (data) {
      const line = data.split(',');

      const endTime = parseInt(line[2]);
      const startTime = parseInt(line[1]);

      if (line[0] !== '0' && !isNaN(endTime)) {
        // Calcular o tempo em segundos a partir do tempo de término e do tempo de inicialização
        const tempoEmSegundos = Math.floor((endTime - database_startup_time) / 1000000);

        if (tempoEmSegundos >= 0) {
          // Verificar se o array para esse segundo já existe
          const entryIndex = contagemComandos.findIndex(entry => entry[0] === tempoEmSegundos);

          if (entryIndex === -1) {
            // Se não existe, adicionar um novo array de contagem
            contagemComandos.push([tempoEmSegundos, 1]);
          } else {
            // Se existe, incrementar a contagem de comandos
            contagemComandos[entryIndex][1]++;
          }
        }
      }

      // Verificar se o tamanho do array aumentou e enviar o penúltimo elemento apenas uma vez
      for (let i = 0; i < contagemComandos.length; i++) {
        if (contagemComandos.length > arrayParaVerificarSeJaFoiEnviado.length) {
          if (i === contagemComandos.length - 2) {
            arrayParaVerificarSeJaFoiEnviado.push(contagemComandos[i]);
            ws.send(JSON.stringify(contagemComandos[i]));
          }
        }
      }
    });

    ws.on('close', () => {
      tail.unwatch();
      // limpar os arrays
      contagemComandos.length = 0;
      arrayParaVerificarSeJaFoiEnviado.length = 0;
      total = 0;
      database_startup_time = 0;
    });
  }
  if (req.url === '/cpu') {
    const data = await fs.promises.readFile(pathCpu, 'utf-8');
    const lines = data.trim().split('\n');

    // Gets the database start up time
    const databaseStartupLine = lines[1].split(';');
    const databaseStartupTime = parseInt(databaseStartupLine[2]);

    lines.splice(0, 2); // Remove header and database startup information

    const x = [];
    const y = [];

    for (let i = 0; i < lines.length; i++) {
      const linha = lines[i].split(';');
      if (linha[0].match(/^\d+$/)) {
        const num = Math.floor((parseInt(linha[0]) - databaseStartupTime) / 1000000);
        x.push(num);
        y.push(parseFloat(linha[1].replace(',', '.')));

        ws.send(JSON.stringify([num, parseFloat(linha[1].replace(',', '.'))]));
      }
    }
  }
  // rotar para iniciar o servidor redis
  if (req.url === '/start') {
    const redisServerPath = path.join(__dirname, '../../MM-DIRECT/src');

    // Navegue até a pasta onde o redis-server está localizado
    process.chdir(redisServerPath);

    // apagar o arquivo de log datasets.csv verificando se ele existe
    const logFile = path.join(redisServerPath, 'datasets/datasets.csv');

    if (fs.existsSync(logFile)) {
      fs.unlinkSync(logFile);
    }
    const child = child_process.spawn('./redis-server');

    child.on('error', (err) => {
      console.error(`Erro ao iniciar o servidor Redis: ${err}`);
    });

    child.on('exit', (code, signal) => {
      console.log(`Servidor Redis encerrado com código ${code} e sinal ${signal}`);
      ws.send('Redis server stopped');
      ws.close();
    });

    child.stdout.on('data', (data) => {
      ws.send('Redis server started');
      const output = data.toString();
      console.log(output);

      // Use uma expressão regular para verificar a mensagem
      const regex = /Memtier benchmark execution finished: \d+\.\d+ seconds\./;
      // verificar se está gerando "Generating information about executed database commands ..."
      const regex2 = /Generating information about executed database commands .../;

      if (regex2.test(output)) {
        console.log('Gerando informações sobre os comandos do banco de dados executados ...');
        ws.send('Generating information database commands');
      }
      if (regex.test(output)) {
        console.log('Encerrando o servidor Redis...');
        child.kill(); // Encerre o processo do servidor Redis
      }
    });

    // se o usuário fechar a conexão, encerre o processo do servidor Redis
    ws.on('close', () => {
      child.kill();
    });
  }
  // rota para parar o servidor redis
  if (req.url === '/stop') {
    const redisServerPath = path.join(__dirname, '../../MM-DIRECT/src');

    // Navegue até a pasta onde o redis-server está localizado
    process.chdir(redisServerPath);

    const child = child_process.spawn('./redis-cli', ['shutdown']);

    child.on('error', (err) => {
      console.error(`Erro ao iniciar o servidor Redis: ${err}`);
    });

    child.on('exit', (code, signal) => {
      console.log(`Servidor Redis encerrado com código ${code} e sinal ${signal}`);
      ws.send('Redis server stopped');
      ws.close();
    });

    child.stdout.on('data', (data) => {
      ws.send('Redis server stopped');
      const output = data.toString();
      console.log(output);
    });

    // se o usuário fechar a conexão, encerre o processo do servidor Redis
    ws.on('close', () => {
      child.kill();
    });
  }
  else {
    ws.send('Invalid URL');
  }


});
