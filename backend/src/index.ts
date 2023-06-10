import express from 'express';
// import { pool } from 'db';

const port = 4000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('server running on port 4000');
});
