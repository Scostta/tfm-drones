import { useState } from 'react';
import { Job } from '../../globalTypes';
import { useManagerContract } from './useManagerContract';

export const useCreateJob = (callback?: () => void) => {
  const [error, errorSet] = useState<string | null>(null);
  const [loading, loadingSet] = useState(false);

  const cleanError = () => errorSet(null);

  const create = (job: Job) => {
    const { droneId, plotId } = job;
    console.log(droneId, plotId);
    loadingSet(true);
    const { contract } = useManagerContract();
    contract
      .setPendingJob(droneId, plotId)
      .then((res: any) => res.wait())
      // .then(() => getDrones())
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
