// Importar os módulos necessários
import csv from 'csv-parser';
import fs from 'fs';
import WebSocket, { WebSocketServer } from 'ws';

// Caminho do arquivo CSV a ser processado
const inputPath = 'datasets.csv';

// Variáveis de controle
let total = 0; // Contador de linhas no CSV
let database_startup_time = 0; // Armazena o tempo de inicialização do banco de dados
const contagemComandos = []; // Armazena os arrays de contagem de comandos por segundo
let arrayParaVerificarSeJaFoiEnviado = []; // Armazena os arrays para verificação de envio

// Criar um servidor WebSocket
const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log('Server started in ws://localhost:8080');
});

// Evento quando uma conexão WebSocket é estabelecida
wss.on('connection', ws => {
  console.log('Client connected');

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
});
