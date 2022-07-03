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
  DRONE: '0xAccf2b735a5Ad02E2Fa818B59eCaE3bd67BE558F',
  PLOT: '0xfE265164872e2A36F5a267A61195C4f523BBE0Dd',
  MANAGER: '0x68EdB447b9dc558D9850B2681f369A4C34156bdA',
};
