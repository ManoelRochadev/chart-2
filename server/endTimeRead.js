import fs from 'fs';
import readline from 'readline';

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

const readDatabaseStartup = async (filePath) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const databaseStartup = parseFloat(line.trim());
    if (!isNaN(databaseStartup)) {
      return databaseStartup;
    }
  }

  throw new Error('Database startup not found in file');
};

const readDatabaseRecovery = async (filePath) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const databaseRecovery = parseFloat(line.trim());
    if (!isNaN(databaseRecovery)) {
      return databaseRecovery;
    }
  }

  throw new Error('Database recovery not found in file');
};

const readOtherElements = async (filePath) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const otherElements = [];

  for await (const line of rl) {
    const elements = line.trim().split(',');
    const name = elements[0].replace('[', '').replace('"', '').replace('"', '');
    const start = parseFloat(elements[1]);
    const end = parseFloat(elements[2]);
    otherElements.push({ name, start, end });
  }

  return otherElements;
};

export const processEndTimes = async (filePath, databaseStartupFilePath, databaseRecoveryFilePath, otherElementsFilePath) => {
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

  const database_startup = await readDatabaseStartup(databaseStartupFilePath);
  const database_recovery = await readDatabaseRecovery(databaseRecoveryFilePath);
  const other_elements = await readOtherElements(otherElementsFilePath);

  let sum_throughput_before_database_startup = 0;
  let sum_throughput_after_database_recovery = 0;
  let sum_throughput_during_database_recovery = 0;
  let total1 = 0;
  let total2 = 0;
  let total3 = 0;

  for (let i = 0; i < y.length; i++) {
    if (x[i] < database_startup) {
      sum_throughput_before_database_startup += y[i];
      total1 += 1;
    } else if (x[i] > database_recovery) {
      sum_throughput_after_database_recovery += y[i];
      total2 += 1;
    } else if (x[i] > database_startup) {
      sum_throughput_during_database_recovery += y[i];
      total3 += 1;
    }
  }

  if (total1 !== 0) {
    console.log(`Average throughput before database startup = ${sum_throughput_before_database_startup / total1}`);
  }
  if (total2 !== 0) {
    console.log(`Average throughput after database recovery = ${sum_throughput_after_database_recovery / total2}`);
  }
  if (total3 !== 0) {
    console.log(`Average throughput during database recovery = ${sum_throughput_during_database_recovery / total3}`);
  }
  console.log(
    `Average throughput = ${(sum_throughput_before_database_startup + sum_throughput_after_database_recovery + sum_throughput_during_database_recovery) /
    (total1 + total2 + total3)
    }`
  );

  const otherElementsInfo = [];

  for (const element of other_elements) {
    const { name, start, end } = element;

    if (name === 'System restart') {
      otherElementsInfo.push({ type: name, time: start });
      console.log(`System restart = ${start} seconds`);
    } else if (name === 'System failure') {
      otherElementsInfo.push({ type: name, time: start });
      console.log(`System failure = ${start} seconds`);
    } else if (name === 'Recovery') {
      otherElementsInfo.push({ type: name, startTime: start, endTime: end });
      console.log(`Recovery: start = ${start} seconds, finish = ${end} seconds`);
    } else if (name === 'Benchmark') {
      otherElementsInfo.push({ type: name, startTime: start, endTime: end });
      console.log(`Benchmark: start = ${start} seconds, finish = ${end} seconds`);
    } else if (name === 'Checkpoint') {
      const duration = end - start;
      otherElementsInfo.push({ type: name, startTime: start, endTime: end, duration });
      console.log(`Checkpoint:`);
      console.log(`    start time = ${start} seconds`);
      console.log(`    finish time = ${end} seconds`);
      console.log(`    time interval = ${duration} seconds`);
    }
  }

  return { x, y, other_elements: otherElementsInfo };
};

// Exemplo de uso:


