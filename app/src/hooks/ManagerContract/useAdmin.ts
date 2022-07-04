import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { isAdminAtom } from '../../store/admin';
import { useMetamask } from '../useMetamask';
import { useManagerContract } from './useManagerContract';

export const useAdmin = (initialLoad?: boolean) => {
  const [error, errorSet] = useState<string | null>(null);
  const [loading, loadingSet] = useState(false);
  const { currentAccount } = useMetamask();
  const [isAdmin, isAdminSet] = useAtom(isAdminAtom);

  const getIsAdmin = () => {
    loadingSet(true);
    const { contract } = useManagerContract();
    contract
      .isCompany(currentAccount)
      .then((res: any) => {
        console.log(res, '>>>>>>>>>>>>> RES');
        isAdminSet(res);
        loadingSet(false);
      })
      .catch((err: any) => {
        console.log(err, 'ERR');
        errorSet(err.code);
        loadingSet(false);
      });
  };

  const setAdmin = () => {
    loadingSet(true);
    const { contract } = useManagerContract();
    contract
      .setCompanyAddress(currentAccount)
      .then((res: any) => {
        res.wait().then((r: any) => getIsAdmin());
      })
      .then((res: any) => {
        loadingSet(false);
      })
      .catch((err: any) => {
        console.log(err, 'ERR');
        errorSet(err.code);
        loadingSet(false);
      });
  };

  useEffect(() => {
    if (currentAccount && initialLoad) {
      getIsAdmin();
    }
  }, [currentAccount]);

  return {
    error,
    loading,
    isAdmin,
    setError: errorSet,
    setAdmin,
  };
};
