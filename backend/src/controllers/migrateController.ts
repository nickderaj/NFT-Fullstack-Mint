import { Request, Response } from 'express';
import { pool } from '../db';

export const migrateController = async (req: Request, res: Response) => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      nric SERIAL PRIMARY KEY,
      wallet VARCHAR(255) UNIQUE NOT NULL`);
    res.status(200).json({ message: 'Migrated!' });
  } catch (e) {
    let error = 'Failed to migrate!';
    if (e instanceof Error) error = e.message;
    res.status(400).json({ error });
  }
};
