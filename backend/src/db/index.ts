import * as dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config({ path: __dirname + '/.env' });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
export const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
});
