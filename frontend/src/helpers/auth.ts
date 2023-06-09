import { setWalletAddress } from '@/redux/slices/userSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

export const connectWallet = async (dispatch: Dispatch) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    dispatch(setWalletAddress(signer.address));
  } catch (error) {
    console.log(error);
  }
};

export const setWallet = async (dispatch: Dispatch) => {
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  if (accounts.length > 0) {
    dispatch(setWalletAddress(accounts[0]));
  }
};
