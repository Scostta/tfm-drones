import { ethers } from 'ethers';
import plotContract from '../../abis/Plot.json';
import { CONTRACTS } from '../../constants';

const contractABI = plotContract.abi;

export const usePlotContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider && provider.getSigner();
  const contract = new ethers.Contract(CONTRACTS.PLOT, contractABI, signer);

  return {
    contract,
  };
};
