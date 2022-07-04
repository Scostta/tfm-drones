import { Contract } from 'ethers';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { dronesAtom } from '../../store/drones';
import { useDroneContract } from './useDroneContract';
import { useMetamask } from '../useMetamask';

const formatDrones = async (dronesFromContract: any, contract: Contract) => {
  if (!dronesFromContract || !contract) return [];
  const drones = await Promise.all(
    dronesFromContract.map(async (drone: any) => {
      return {
        id: drone.id.toNumber(),
        ownerName: drone.ownerName,
        owner: drone.owner.toLowerCase(),
        model: drone.model,
        maxFlightAltitude: drone.maxFlightAltitude.toNumber(),
        minFlightAltitude: drone.minFlightAltitude.toNumber(),
        pesticides: drone.pesticides,
        cost: drone.cost.toNumber(),
      };
    })
  );
  return drones;
};

export const useGetDrones = (initialLoad?: boolean) => {
  const { currentAccount } = useMetamask();
  const [error, errorSet] = useState<string>();
  const [loading, loadingSet] = useState(false);
  const { contract } = useDroneContract();
  const [drones, dronesSet] = useAtom(dronesAtom);

  const getDrones = () => {
    loadingSet(true);
    contract
      .getDrones()
      .then((res: any) => {
        formatDrones(res, contract)
          .then((formattedRes: any) => dronesSet(formattedRes))
          .catch((err) => {
            throw new Error(err);
          });
        loadingSet(false);
      })
      .catch((err: string) => {
        console.log(err);
        errorSet(err);
        loadingSet(false);
      });
  };

  useEffect(() => {
    if (initialLoad && currentAccount) {
      getDrones();
    }
  }, [currentAccount]);

  return {
    error,
    data: drones,
    loading,
    getDrones,
  };
};
