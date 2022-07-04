import { BigNumber } from 'ethers';
import { useState } from 'react';
import { Job } from '../../globalTypes';
import { useGetJobs } from './useGetJobs';
import { useManagerContract } from './useManagerContract';

export const useCreateJob = (callback?: () => void) => {
  const [error, errorSet] = useState<string | null>(null);
  const [loading, loadingSet] = useState(false);
  const { getJobs } = useGetJobs();

  const cleanError = () => errorSet(null);

  const create = (job: Job) => {
    const { droneId, plotId } = job;

    loadingSet(true);
    const { contract } = useManagerContract();
    contract
      .setPendingJob(BigNumber.from(droneId), BigNumber.from(plotId))
      .then((res: any) => res.wait().then(() => getJobs()))
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
