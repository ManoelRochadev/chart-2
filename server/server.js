import express from "express";
import fs from 'fs';
import readline from 'readline';

   const processEndTimes = async (filePath, databaseStartupFilePath, databaseRecoveryFilePath, otherElementsFilePath) => {
    const findLargestNumber = 5253 + 1;
  
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

console.log(x, y)