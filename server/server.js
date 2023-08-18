import express from "express";
import fs from 'fs';
import csv from 'csv-parser';
import readline from 'readline';

const DATABASE_STARTUP = "Database startup"
const SHUTDOWN = "Shutdown"
const RECOVERY = "Recovery"
const BENCHMARK = "Benchmark"
const CHECKPOINT = "Checkpoint"
const CHECKPOINT_END = "Checkpoint End"
let largestNumber = 0; // Variável para armazenar o maior número

function readData(inputPath) {
  return new Promise((resolve, reject) => {
    let total = 0;
    let database_startup_time = 0;
    let database_startup = fs.createWriteStream('./temp/database_startup.txt');
    let database_recovery = fs.createWriteStream('./temp/database_recovery.txt');
    const end_time_list = fs.createWriteStream('./temp/end_time.txt');
    const other_elements = fs.createWriteStream('./temp/other_elements.txt');

    fs.createReadStream(inputPath)
      .pipe(csv())
      .on('data', (row) => {
        total++;

        if (total === 1) {
          // Get the database startup time from the second row
          database_startup_time = parseInt(row.startTime);
        } else if (total >= 3) {
          if (row.type !== '0') {
            // Store the endTime of a performed command
            if (!isNaN(row.finishTime)) {
              const time = parseInt((parseInt(row.finishTime) - database_startup_time) / 1000000);
              end_time_list.write(time + '\n');
              if (time > largestNumber) {
                largestNumber = time; // Atualize o maior número se necessário
              }
            }
          } else {
            // Process database startup, shutdown, recovery, benchmark, checkpoint, and checkpoint end
            if (row.key === DATABASE_STARTUP) {
              const element = [
                'System restart',
                parseFloat((parseInt(row.startTime) - database_startup_time) / 1000000),
              ];
              database_startup.write(element[1] + '\n');
              other_elements.write(JSON.stringify(element) + '\n');
            } else if (row.key === SHUTDOWN) {
              const element = [
                'System failure',
                parseFloat((parseInt(row.startTime) - database_startup_time) / 1000000),
              ];
              other_elements.write(JSON.stringify(element) + '\n');
            } else if (row.key === RECOVERY) {
              const start_time = parseFloat((parseInt(row.startTime) - database_startup_time) / 1000000);
              if (start_time > 0) {
                const element = [
                  'Recovery',
                  start_time,
                  parseFloat((parseInt(row.finishTime) - database_startup_time) / 1000000),
                ];
                database_recovery.write(element[2] + '\n');
                other_elements.write(JSON.stringify(element) + '\n');
              }
            } else if (row.key === BENCHMARK) {
              const element = [
                'Benchmark',
                parseFloat((parseInt(row.startTime) - database_startup_time) / 1000000),
                parseFloat((parseInt(row.finishTime) - database_startup_time) / 1000000),
              ];
              other_elements.write(JSON.stringify(element) + '\n');
            } else if (row.key === CHECKPOINT) {
              const element = [
                'Checkpoint',
                row.command,
                parseFloat((parseInt(row.startTime) - database_startup_time) / 1000000),
                parseFloat((parseInt(row.finishTime) - database_startup_time) / 1000000),
              ];
              other_elements.write(JSON.stringify(element) + '\n');
            } else if (row.key === CHECKPOINT_END) {
              const element = [
                'Checkpoint End',
                row.command,
                parseFloat((parseInt(row.finishTime) - database_startup_time) / 1000000),
              ];
              other_elements.write(JSON.stringify(element) + '\n');
            }
          }
        }
      })
      .on('end', () => {
        database_startup.end();
        database_recovery.end();
        end_time_list.end();
        other_elements.end();
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

const processEndTimes = async (filePath, databaseStartupFilePath, databaseRecoveryFilePath, otherElementsFilePath, largestNumber) => {
  console.log(largestNumber)
  const findLargestNumber = largestNumber + 1;

  const x = Array.from({ length: findLargestNumber }, (_, i) => i);
  const y = Array(x.length).fill(0);

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let j = 0;
  for await (const line of rl) {
    const endTime = parseInt(line.trim(), 10);
    if (!isNaN(endTime)) {
      while (x[j] < endTime) {
        j++;
      }
      if (x[j] === endTime) {
        y[j] += 1;
      }
    }
  }


  return { x, y }
};

const app = express();
const port = 3333; // Porta do servidor

app.listen(port, () => {
  console.log(`Servidor rodando na porta:
  http://localhost:${port}
  rota para o primeiro dataset pequeno: http://localhost:${port}/data
  rota para o segundo dataset grande: http://localhost:${port}/data2
  `);
});


// rota para o primeiro dataset
app.get('/data', async (req, res) => {
  try {
    await readData('datasets.csv')
  .then((result) => {
    console.log('csv lido');
      processEndTimes('./temp/end_time.txt', './temp/database_startup.txt', './temp/database_recovery.txt', './temp/other_elements.txt', largestNumber).then((result) => {
        console.log('processEndTimes executado');
        res.status(200).json({ result });
      });
  })
  .catch((error) => {
    console.error('Ocorreu um erro:', error);
  });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar os dados.' });
  }
});


// rota para o segundo dataset
app.get('/data2', async (req, res) => {
  try {
    await readData('ir.csv')
  .then((result) => {
    console.log('csv lido');
      processEndTimes('./temp/end_time.txt', './temp/database_startup.txt', './temp/database_recovery.txt', './temp/other_elements.txt', largestNumber).then((result) => {
        console.log('processEndTimes executado');
        res.status(200).json({ result });
      });
  })
  .catch((error) => {
    console.error('Ocorreu um erro:', error);
  });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar os dados.' });
  }
});