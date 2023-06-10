import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
dotenv.config({ path: __dirname + '/.env' });

const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY ?? '';
const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY ?? '';
const SEPOLIA_KEY = process.env.SEPOLIA_PRIVATE_KEY ?? '';

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  etherscan: { apiKey: ETHERSCAN_KEY },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      accounts: [SEPOLIA_KEY],
    },
  },
};

export default config;
