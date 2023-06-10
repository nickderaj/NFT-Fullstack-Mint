import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:5431';

export const createUser = async (wallet: string, nric: string) => {
  try {
    const res = await axios.post(`${API_ENDPOINT}/users`, { wallet, nric });
    toast('Successfully logged in!', { type: 'success' });
    return res;
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.data?.error?.includes('duplicate key value violates unique constraint'))
      return toast('NRIC already in use!', { type: 'error' });
    toast('Server not responding!', { type: 'error' });
  }
};

export const fetchUser = async (wallet: string) => {
  try {
    const res = await axios.get(`${API_ENDPOINT}/users/${wallet}`);
    return res;
  } catch (error) {
    toast('Server not responding!', { type: 'error' });
    console.error('Fetch User Error: ', error);
  }
};
