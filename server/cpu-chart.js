import fs from 'fs'
// path = path to dataset
// path = path to dataset

export async function processData(path) {
  const data = await fs.promises.readFile(path, 'utf-8');
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
    }
  }

  return { x, y };
}
