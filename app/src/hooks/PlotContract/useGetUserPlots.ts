import { BigNumber, Contract } from 'ethers';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { plotsAtom } from '../../store/plots';
import { useMetamask } from '../useMetamask';
import { usePlotContract } from './usePlotContract';

const formatPlots = async (plotsFromContract: any, contract: Contract) => {
  if (!plotsFromContract || !contract) return [];
  const plots = await Promise.all(
    plotsFromContract.map(async (plotFromContract: any) => {
      const plot = await contract.getPlot(BigNumber.from(plotFromContract));
      console.log(plot);
      return {
        ownerName: plot.ownerName,
        owner: plot.owner,
        allowedMaxFlightAltitude: plot.allowedMaxFlightAltitude.toNumber(),
        allowedMinFlightAltitude: plot.allowedMinFlightAltitude.toNumber(),
        pesticide: plot.pesticide,
      };
    })
  );
  return plots;
};

export const useGetUserPlots = (initialLoad?: boolean) => {
  const { currentAccount } = useMetamask();
  const [error, errorSet] = useState<string>();
  const [loading, loadingSet] = useState(false);
  const { contract } = usePlotContract();
  const [plots, plotsSet] = useAtom(plotsAtom);

  const getPlots = () => {
    if (currentAccount) {
      loadingSet(true);
      contract
        .getPlotsByOwner(currentAccount)
        .then((res: any) => {
          formatPlots(res, contract)
            .then((formattedRes: any) => plotsSet(formattedRes))
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
      getPlots();
    }
  }, [currentAccount]);

  return {
    error,
    data: plots,
    loading,
    getPlots,
  };
};
