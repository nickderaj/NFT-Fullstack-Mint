import axios from 'axios';
import { toast } from 'react-toastify';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:5431';

export const generateReceipt = async (wallet: string, nric: string) => {
  try {
    const res = await axios.post(`${API_ENDPOINT}/receipt`, { wallet, nric });
    return res;
  } catch (error) {
    toast('Server not responding!', { type: 'error' });
  }
};
