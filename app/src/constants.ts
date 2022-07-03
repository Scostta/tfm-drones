export const ETH = {
  ACCOUNTS: 'eth_accounts',
  CHAIN_ID: 'eth_chainId',
  REQ_ACCOUNTS: 'eth_requestAccounts',
  CHAIN_CHANGED: 'chainChanged',
  ACCOUNTS_CHANGED: 'accountsChanged',
};
export const CHAIN_IDS = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
};
export const CHAIN_NETWORKS = {
  [CHAIN_IDS.MAINNET]: 'mainnet',
  [CHAIN_IDS.ROPSTEN]: 'ropsten',
  [CHAIN_IDS.RINKEBY]: 'rinkeby',
  [CHAIN_IDS.GOERLI]: 'goerli',
  [CHAIN_IDS.KOVAN]: 'kovan',
};
export const CUSTOM_ERRORS = {
  NO_METAMASK: 'No Metamask detected, please install',
  MULTIPLE_WALLETS:
    'Metamask installed, but multiple wallets have been detected',
  NO_CONNECTED: 'Please connect to MetaMask.',
  UNSUPPORTED_NETWORK: 'Unsupported network',
};

export const SUPPORTED_CHAIN_ID = CHAIN_IDS.RINKEBY;
// ⛽️ Setting gas limit
export const GAS_LIMIT = 300000;

/**
 * Holds the contract addresses after deploy!
 */
export const CONTRACTS = {
  DRONE: '0x44E6106733Ba7cbf2ab3B29b20E2d7957689D4b0',
  PLOT: '0xD7C53A5aB24D0D5e083f50A2e520859Ccf0Fe76c',
  MANAGER: '0x4342f518E3453237ba4C2368E2Cf048720d8f5FE',
};
