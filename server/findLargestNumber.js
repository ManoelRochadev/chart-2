import fs from 'fs';

const filePath = 'end_time.txt';

export function findLargestNumber() {
  return new Promise((resolve, reject) => {
    let largestNumber = -Infinity;

    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    readStream.on('data', (chunk) => {
      const numbers = chunk.match(/\d+(\.\d+)?/g); // Extrai todos os números do chunk

      if (numbers) {
        const maxChunkNumber = Math.max(...numbers.map(Number)); // Encontra o maior número no chunk
        largestNumber = Math.max(largestNumber, maxChunkNumber); // Atualiza o maior número globalmente
      }
    });

    readStream.on('end', () => {
      if (largestNumber === -Infinity) {
        resolve(null); // Nenhum número encontrado
      } else {
        resolve(largestNumber); // Maior número encontrado
      }
    });

    readStream.on('error', (err) => {
      reject(err); // Trata erros na leitura do arquivo
    });
  });
}
