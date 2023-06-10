import { Request, Response } from 'express';
import { pool } from '../app';

export const migrateDb = async (_req: Request, res: Response) => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS users;
      CREATE TABLE  users (
        nric VARCHAR(255) PRIMARY KEY,
        wallet VARCHAR(255) UNIQUE NOT NULL
      )`);
    res.status(200).json({ message: 'Migrated!' });
  } catch (e) {
    let error = 'Failed to migrate!';
    if (e instanceof Error) error = e.message;
    res.status(400).json({ error });
  }
};
