import { BigNumber, Contract } from 'ethers';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { dronesAtom } from '../store/drones';
import { useDroneContract } from './useDroneContract';
import { useMetamask } from './useMetamask';

const formatDrones = async (dronesFromContract: any, contract: Contract) => {
  if (!dronesFromContract || !contract) return [];
  const drones = await Promise.all(
    dronesFromContract.map(async (droneFromContract: any) => {
      const drone = await contract.getDrone(BigNumber.from(droneFromContract));
      console.log(drone);
      return {
        maxFlightAltitude: drone.maxFlightAltitude.toNumber(),
        minFlightAltitude: drone.minFlightAltitude.toNumber(),
        pesticides: drone.pesticides,
      };
    })
  );
  return drones;
};

export const useGetUserDrones = (initialLoad?: boolean) => {
  const { currentAccount } = useMetamask();
  const [error, errorSet] = useState<string>();
  const [loading, loadingSet] = useState(false);
  const { contract } = useDroneContract();
  const [drones, dronesSet] = useAtom(dronesAtom);

  const getDrones = () => {
    if (currentAccount) {
      loadingSet(true);
      contract
        .getDronesByOwner(currentAccount)
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
    }
  };

  useEffect(() => {
    if (initialLoad) {
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
