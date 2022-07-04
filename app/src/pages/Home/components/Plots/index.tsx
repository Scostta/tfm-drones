import React, { useState } from 'react';
import { Box, Flex, Image, Tag } from '@chakra-ui/react';
import PlotImage from '../../../../assets/land.png';
import { Card } from '../../../../components/core/UI/Card';
import { useGetPlots } from '../../../../hooks/PlotContract/useGetPlots';
import { useUpdateAtom } from 'jotai/utils';
import { plotSelectedAtom } from '../../../../store/plots';
import { Accordion } from '../../../../components/core/UI/Accordion';
import { useMetamask } from '../../../../hooks/useMetamask';
import { Filter } from '../Filter';

export const Plots: React.FC = () => {
  const { data = [], loading } = useGetPlots(true);
  const selectedPlot = useUpdateAtom(plotSelectedAtom);
  const { currentAccount } = useMetamask();
  const [filterMyPlots, filterMyPlotsSet] = useState<boolean>(false);

  return (
    <Accordion
      title={
        <Flex justify="space-between" width="100%" pr={4}>
          <div>Total: {data.length}</div>
          <Filter
            label="Filtrar por mis parcelas"
            value={filterMyPlots}
            onChange={filterMyPlotsSet}
          />
        </Flex>
      }
      defaultOpen={true}
      isLoading={loading}
    >
      <Flex flexWrap="wrap" justify="flex-start" gap={4}>
        {data
          ?.filter((plot) => {
            if (filterMyPlots) {
              return plot.owner === currentAccount;
            }
            return true;
          })
          .map((plot, i) => (
            <Card
              key={i}
              cursor={
                currentAccount === plot?.owner ? 'pointer' : 'not-allowed'
              }
              position="relative"
              onClick={() => {
                if (currentAccount !== plot?.owner) return {};
                return selectedPlot(plot);
              }}
            >
              {currentAccount === plot?.owner && (
                <Tag colorScheme="green" zIndex={2}>
                  Se puede fumigar
                </Tag>
              )}
              <Box>
                <Image width="256px" src={PlotImage} />
              </Box>
              <Flex
                direction="column"
                justify="flex-end"
                backgroundColor="rgba(0,0,0, 0.7)"
                p={4}
                color="white"
              >
                <div>Owner: {plot?.ownerName}</div>
                <div>
                  Allowed Max Flight Altitude: {plot?.allowedMaxFlightAltitude}
                </div>
                <div>
                  Allowed Min Flight Altitude: {plot?.allowedMinFlightAltitude}
                </div>
                <div>Pesticide: {plot?.pesticide}</div>
              </Flex>
            </Card>
          ))}
      </Flex>
    </Accordion>
  );
};
