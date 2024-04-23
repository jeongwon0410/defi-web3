import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.5.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true,
      evmVersion: "byzantium"
    }
  },
  networks: {
    // for kroma mainnet
    'kroma-mainnet': {
      url: 'https://api.kroma.network',
      chainId: 255,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    // for kroma mainnet
    'kroma-testnet': {
      url: 'https://api.sepolia.kroma.network/',
      chainId: 2358,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    // for local devnet
    'kroma-local': {
      url: 'http://localhost:8545',
      chainId: 7790,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: {
      kroma: '99IHXE9EGW46MUZBT72SCNSPD6NYCQZNBB',
    },
    customChains: [
      {
        network: "kroma-testnet",
        chainId: 2358,
        urls: {
          apiURL: "https://api.sepolia.kroma.network/",
          browserURL: "https://sepolia.kromascan.com/"
        }
      }
    ]
  },
  defaultNetwork: 'hardhat',
};

export default config;