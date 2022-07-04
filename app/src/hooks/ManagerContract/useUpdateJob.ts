import { BigNumber } from 'ethers';
import { useState } from 'react';
import { useMetamask } from '../useMetamask';
import { useGetJobs } from './useGetJobs';
import { useManagerContract } from './useManagerContract';

export const useUpdateJob = (callback?: () => void) => {
  const [error, errorSet] = useState<string | null>(null);
  const [loading, loadingSet] = useState(false);
  const { currentAccount } = useMetamask();
  const { getJobs } = useGetJobs();

  const cleanError = () => errorSet(null);

  const approve = (jobId?: number) => {
    if (jobId === undefined) return;
    loadingSet(true);
    const { contract } = useManagerContract();
    contract
      .acceptJob(BigNumber.from(jobId), currentAccount)
      .then((res: any) => res.wait())
      .then(() => getJobs())
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

  const decline = (jobId?: number) => {
    if (jobId === undefined) return;
    loadingSet(true);
    const { contract } = useManagerContract();
    contract
      .declineJob(BigNumber.from(jobId), currentAccount)
      .then((res: any) => res.wait())
      .then(() => getJobs())
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
    approve,
    decline,
    cleanError,
    setError: errorSet,
  };
};
