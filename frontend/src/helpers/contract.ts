import { ABI, CONTRACT_ADDRESS } from '@/constants/contract.constants';
import { errorTypes } from '@/models/Error';
import { NFT } from '@/models/NFT';
import { setLatestTx } from '@/redux/slices/nftSlice';
import { store } from '@/redux/store';
import { Dispatch } from '@reduxjs/toolkit';
import { Alchemy, Network } from 'alchemy-sdk';
import { Contract, ethers } from 'ethers';
import { toast } from 'react-toastify';

const alchemySettings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

// Mint an NFT
export const mint = async (amount: number, setState: React.Dispatch<React.SetStateAction<string>>, dispatch: Dispatch) => {
  try {
    setState('Minting...');
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(CONTRACT_ADDRESS, JSON.stringify(ABI), signer);

    // Mint NFT
    const tx = await contract.mint(amount);

    // Wait for completion
    const receipt = await tx.wait();
    dispatch(setLatestTx(receipt.hash));

    setState('Minted!');
    toast('Minted!', { type: 'success' });
    // Reset to allow minting again
    setTimeout(() => setState('Mint'), 3000);
  } catch (error) {
    const errors = Object.values(errorTypes);

    for (const err of errors) {
      if (String(error).includes(err)) {
        toast(err, { type: 'error' });
      }
    }
    setState('Mint');
    console.error('Mint function error: ', error);
  }
};

// Get NFT Price
export const getPrice = async (): Promise<number> => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(CONTRACT_ADDRESS, JSON.stringify(ABI), signer);

    let price = await contract.price();

    // convert wei to ether
    price = ethers.formatEther(price);
    return +parseFloat(price).toFixed(4);
  } catch (error) {
    console.error('Get Price function error: ', error);
    return 0;
  }
};

export const fetchNFTs = async (): Promise<NFT[]> => {
  console.log('hello');
  const walletAddress = store.getState().user.walletAddress || '';
  if (!walletAddress) return [];

  const alchemy = new Alchemy(alchemySettings);
  const nftsForOwner = await alchemy.nft.getNftsForOwner(walletAddress);
  const nfts: NFT[] = [];
  for (const nft of nftsForOwner.ownedNfts) {
    if (nft.contract.address !== CONTRACT_ADDRESS) continue;
    nfts.push(nft.rawMetadata as NFT);
  }

  return nfts;
};
