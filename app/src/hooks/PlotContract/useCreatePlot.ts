import { useState } from 'react';
import { Plot } from '../../globalTypes';
import { useGetPlots } from './useGetPlots';
import { usePlotContract } from './usePlotContract';

export const useCreatePlot = (callback?: () => void) => {
  const [error, errorSet] = useState<string | null>(null);
  const [loading, loadingSet] = useState(false);
  const { getPlots } = useGetPlots();

  const cleanError = () => errorSet(null);

  const create = (plot: Plot) => {
    const {
      ownerName,
      allowedMaxFlightAltitude,
      allowedMinFlightAltitude,
      pesticide,
    } = plot;

    loadingSet(true);
    const { contract } = usePlotContract();
    contract
      .mintNewPlot(
        ownerName,
        allowedMaxFlightAltitude,
        allowedMinFlightAltitude,
        pesticide
      )
      .then((res: any) => res.wait().then(() => getPlots()))
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
