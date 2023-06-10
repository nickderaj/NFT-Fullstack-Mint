import express from 'express';
import { migrateController } from './controllers/migrateController';
import { generateReceipt } from './controllers/receiptController';

const port = 4000;
const app = express();

app.use(express.json());
app.post('/receipt', generateReceipt);
app.post('/migrate', migrateController);

app.listen(port, () => {
  console.log('server running on port 4000');
});
