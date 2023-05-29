import express from "express";
import { processEndTimes } from "./endTimeRead.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.get('/api/data', async (req, res) => {
  const result = await processEndTimes(
    './logs/end_time.txt',
    './logs/database_startup.txt',
    './logs/database_recovery.txt',
    './logs/other_elements.txt'
  );
  const data = {
    x: result.x,
    y: result.y,
    otherElements: result.other_elements,
  };
  res.json(data);
});

