import { Request, Response } from 'express';

export const healthCheck = async (_req: Request, res: Response) => {
  res.status(200).send('OK');
};
