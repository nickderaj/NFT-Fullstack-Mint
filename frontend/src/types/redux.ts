import { NFT } from '@/models/NFT';

export interface IModalState {
  sampleModalOpen: boolean;
}

export interface IUserState {
  walletAddress: string;
  nric: string;
}

export interface INftState {
  nftsOwned: NFT[];
  latestTx: string;
}
