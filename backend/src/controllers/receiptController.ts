import * as crypto from 'crypto';
import { hashMessage } from 'ethers';
import { Request, Response } from 'express';

const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPTION_KEY ?? '4dfg9a24f8a0123bc3456789def01234';

const encryptResponse = (message: string) => {
  if (!key) throw new Error('Encryption key not found!');

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const encryptedResponse = iv.toString('hex') + encrypted;

  return encryptedResponse;
};

function decryptResponse(encryptedResponse: string) {
  if (!key) throw new Error('Encryption key not found!');

  const iv = Buffer.from(encryptedResponse.slice(0, 32), 'hex');
  const encryptedData = encryptedResponse.slice(32);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
}

export const generateReceipt = async (req: Request, res: Response) => {
  try {
    const { nric, wallet } = req.body;
    if (!nric || !wallet) throw new Error('Invalid request body!');

    const receipt = req.body;
    const encryptedReceipt = encryptResponse(JSON.stringify(receipt));
    const hashedReceipt = hashMessage(JSON.stringify(receipt));

    res.status(200).json({ encryptedReceipt, hashedReceipt });
  } catch (e) {
    let error = 'Failed to generate receipt!';
    if (e instanceof Error) error = e.message;
    res.status(400).json({ error });
  }
};
