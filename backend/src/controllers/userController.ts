import { Request, Response } from 'express';
import { pool } from '../app';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { wallet, nric } = req.body;
    const user = await pool.query(`INSERT INTO users (wallet, nric) VALUES ($1, $2)`, [wallet, nric]);
    res.status(200).json({ message: 'Created user!', user });
  } catch (e) {
    let error = 'Failed to create user!';
    if (e instanceof Error) error = e.message;
    res.status(400).json({ error });
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.params;
    const userQuery = await pool.query('SELECT nric, wallet FROM users WHERE wallet = $1', [wallet]);
    const user = userQuery.rows[0];

    if (!user) res.status(200).json({ message: 'User not found!' });
    res.status(200).json({ message: 'fetched user!', user });
  } catch (e) {
    let error = 'Failed to fetch user!';
    if (e instanceof Error) error = e.message;
    res.status(400).json({ error });
  }
};
