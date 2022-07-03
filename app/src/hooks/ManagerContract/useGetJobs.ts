import { Contract } from 'ethers';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { jobsAtom } from '../../store/jobs';
import { useManagerContract } from './useManagerContract';
import { useMetamask } from '../useMetamask';

const formatJobs = async (jobsFromContract: any, contract: Contract) => {
  if (!jobsFromContract || !contract) return [];
  const jobs = await Promise.all(
    jobsFromContract.map(async (job: any) => {
      console.log(job);
      return {
        id: job.id.toNumber(),
        droneId: job.droneId.toNumber(),
        plotId: job.plotId.toNumber(),
      };
    })
  );
  return jobs;
};

export const useGetJobs = (initialLoad?: boolean) => {
  const { currentAccount } = useMetamask();
  const [error, errorSet] = useState<string>();
  const [loading, loadingSet] = useState(false);
  const { contract } = useManagerContract();
  const [jobs, jobsSet] = useAtom(jobsAtom);

  const getJobs = () => {
    loadingSet(true);
    contract
      .getJobs()
      .then((res: any) => {
        formatJobs(res, contract)
          .then((formattedRes: any) => jobsSet(formattedRes))
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
    if (initialLoad) {
      getJobs();
    }
  }, [currentAccount]);

  return {
    error,
    data: jobs,
    loading,
    getJobs,
  };
};
