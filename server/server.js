import express from "express";
import fs from 'fs';
import csv from 'csv-parser';
import WebSocket, { WebSocketServer } from 'ws';
import cors from 'cors';


const app = express();
app.use(cors());
const port = 8080;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// Caminho do arquivo CSV a ser processado
const inputPath = 'datasets.csv';
const pathCpu = 'system_monitoring.csv'

// Variáveis de controle
let total = 0; // Contador de linhas no CSV
let database_startup_time = 0; // Armazena o tempo de inicialização do banco de dados
const contagemComandos = []; // Armazena os arrays de contagem de comandos por segundo
let arrayParaVerificarSeJaFoiEnviado = []; // Armazena os arrays para verificação de envio

// Criar um servidor WebSocket
const wss = new WebSocketServer({ server }, () => {
  console.log(`
  rota para o dataset de comandos por segundo: ws://localhost:8080/data
  rota para o dataset de uso de cpu: ws://localhost:8080/cpu
  `);
});

// Evento quando uma conexão WebSocket é estabelecida
wss.on('connection', async (ws, req) => {
  console.log('Client connected');

  if (req.url === '/data') {
    // Lê e processa o arquivo CSV
    fs.createReadStream(inputPath)
      .pipe(csv())
      .on('data', (row) => {
        total++;

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
        ws.send(JSON.stringify(contagemComandos[contagemComandos.length - 1]));
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
  } else {
    ws.send('Invalid URL');
  }
});
