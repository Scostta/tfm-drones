import { useState } from 'react';
import { Drone } from '../globalTypes';
import { useDroneContract } from './useDroneContract';
import { useGetUserDrones } from './useGetUserDrones';

export const useCreateDrone = (callback?: () => void) => {
  const [error, errorSet] = useState<string | null>(null);
  const [loading, loadingSet] = useState(false);
  const { getDrones } = useGetUserDrones();

  const cleanError = () => errorSet(null);

  const create = (drone: Drone) => {
    const { model, maxFlightAltitude, minFlightAltitude, pesticides } = drone;

    loadingSet(true);
    const { contract } = useDroneContract();
    contract
      .mintNewDrone(maxFlightAltitude, minFlightAltitude, pesticides)
      .then((res: any) => res.wait())
      .then(() => getDrones())
      .then((res: any) => {
        loadingSet(false);
        callback && callback();
      })
      .catch((err: any) => {
        console.log(err, 'ERR');
        errorSet(err.code);
        loadingSet(false);
        callback && callback();
      });
  };

  return {
    error,
    loading,
    create,
    cleanError,
  };
};
