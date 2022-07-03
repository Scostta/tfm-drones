import { ethers } from 'ethers';
import droneContract from '../../abis/Drone.json';
import { CONTRACTS } from '../../constants';

const contractABI = droneContract.abi;

export const useDroneContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider && provider.getSigner();
  const contract = new ethers.Contract(CONTRACTS.DRONE, contractABI, signer);

  return {
    contract,
  };
};
