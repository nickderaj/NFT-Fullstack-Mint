import { ABI, CONTRACT_ADDRESS } from '@/constants/contract.constants';
import { Contract, ethers } from 'ethers';

// Mint an NFT
export const mint = async (amount: number) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(CONTRACT_ADDRESS, JSON.stringify(ABI), signer);

    const tx = await contract.mint(amount);
    await tx.wait();
    console.log('done');
  } catch (error) {
    console.error('Minting function error: ', error);
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
