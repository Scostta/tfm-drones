import { ethers } from 'ethers';
import managerContract from '../../abis/Manager.json';
import { CONTRACTS } from '../../constants';

const contractABI = managerContract.abi;

export const useManagerContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider && provider.getSigner();
  const contract = new ethers.Contract(CONTRACTS.MANAGER, contractABI, signer);

  return {
    contract,
  };
};
