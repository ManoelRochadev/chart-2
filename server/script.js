import fs from 'fs';
import csv from 'csv-parser';

const DATABASE_STARTUP = "Database startup"
const SHUTDOWN = "Shutdown"
const RECOVERY = "Recovery"
const BENCHMARK = "Benchmark"
const CHECKPOINT = "Checkpoint"
const CHECKPOINT_END = "Checkpoint End"

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

        if (total === 2) {
          // Get the database startup time from the second row
          database_startup_time = parseInt(row.startTime);
        } else if (total >= 3) {
          if (row.type !== '0') {
            // Store the endTime of a performed command
            if (!isNaN(row.finishTime)) {
              const time = parseInt((parseInt(row.finishTime) - database_startup_time) / 1000000);
              end_time_list.write(time + '\n');
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
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

readData('ir.csv')
  .then((result) => {
    console.log('Finalizado com sucesso!');
  })
  .catch((error) => {
    console.error('Ocorreu um erro:', error);
  });