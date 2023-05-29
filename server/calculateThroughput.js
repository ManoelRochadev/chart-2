import fs from 'fs';

const end_time_list = fs.readFileSync('end_time.txt');
const other_elements = fs.readFileSync('other_elements.txt')
const database_startup = parseFloat(fs.readFileSync('database_startup.txt'));
const database_recovery = parseFloat(fs.readFileSync('database_recovery.txt'));
import { findLargestNumber } from './findLargestNumber.js';

function calculateThroughput() {

  const x = Array.from({ length: findLargestNumber }, (_, i) => i); // List from zero to maximum end of time
  const y = Array(x.length).fill(0); // List of zeros

  // Stores in y the number of items in x that are in end_time_list
  let j = 0;
  for (let i = 0; i < x.length; i++) {
    if (x[i] === end_time_list[j]) {
      y[i] += 1;
      j += 1;
    }
  }

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
    `Average throughput = ${
      (sum_throughput_before_database_startup + sum_throughput_after_database_recovery + sum_throughput_during_database_recovery) /
      (total1 + total2 + total3)
    }`
  );

  return { x, y, other_elements };
}

