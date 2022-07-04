import { useState } from 'react';
import { Drone } from '../../globalTypes';
import { useDroneContract } from './useDroneContract';
import { useGetDrones } from './useGetDrones';

export const useCreateDrone = (callback?: () => void) => {
  const [error, errorSet] = useState<string | null>(null);
  const [loading, loadingSet] = useState(false);
  const { getDrones } = useGetDrones();

  const cleanError = () => errorSet(null);

  const create = (drone: Drone) => {
    const {
      ownerName,
      model,
      maxFlightAltitude,
      minFlightAltitude,
      pesticides,
      cost,
    } = drone;

    loadingSet(true);
    const { contract } = useDroneContract();
    contract
      .mintNewDrone(
        ownerName,
        model,
        maxFlightAltitude,
        minFlightAltitude,
        pesticides,
        cost
      )
      .then((res: any) => res.wait().then(() => getDrones()))
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
    setError: errorSet,
  };
};
