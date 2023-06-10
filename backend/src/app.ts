import dotenv from 'dotenv';
import express from 'express';
import { Pool } from 'pg';
import { healthCheck } from './controllers/healthCheckController';
import { migrateDb } from './controllers/migrationController';
import { generateReceipt } from './controllers/receiptController';
import { createUser, fetchUser } from './controllers/userController';
dotenv.config();

const app = express();
app.use(express.json());

// Database
export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});
pool.connect();

// Routes
app.get('/migrate', migrateDb);
app.post('/receipt', generateReceipt);
app.get('/users/:nric', fetchUser);
app.post('/users', createUser);
app.get('/', healthCheck);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
