import express from "express";
import fs from 'fs';
import readline from 'readline';
import { readData } from './script.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.get('/api/data', async (req, res) => {
  const findLargestNumberInFile = async (filePath) => {
    let largestNumber = 0;
  
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
  
    for await (const line of rl) {
      const endTime = parseInt(line.trim(), 10);
      if (!isNaN(endTime) && endTime > largestNumber) {
        largestNumber = endTime;
      }
    }
  
    return largestNumber;
  };

   const processEndTimes = async (filePath, databaseStartupFilePath, databaseRecoveryFilePath, otherElementsFilePath) => {
    const findLargestNumber = await findLargestNumberInFile(filePath) + 1;
  
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
  
    return { x, y};
  };
  const {x, y} = await processEndTimes(
    './temp/end_time.txt',
    './temp/database_startup.txt',
    './temp/database_recovery.txt',
    './temp/other_elements.txt'
  );

  res.json({ x, y });
});