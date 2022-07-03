import React from 'react';
import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import PlotImage from '../../../../assets/land.png';
import { Card } from '../../../../components/core/UI/Card';
import { useGetPlots } from '../../../../hooks/PlotContract/useGetPlots';
import { useUpdateAtom } from 'jotai/utils';
import { plotSelectedAtom } from '../../../../store/plots';

export const Plots: React.FC = () => {
  const { data = [], loading } = useGetPlots(true);
  const selectedPlot = useUpdateAtom(plotSelectedAtom);
  return (
    <>
      <Flex flexWrap="wrap" justify="flex-start" gap={4}>
        {loading && (
          <Flex justify="center" width="100%">
            <Spinner />
          </Flex>
        )}
        {data?.map((plot, i) => (
          <Card
            key={i}
            cursor="pointer"
            onClick={() => selectedPlot(plot)}
            position="relative"
          >
            <Flex
              direction="column"
              justify="flex-end"
              position="absolute"
              top={0}
              left={0}
              backgroundColor="rgba(0,0,0, 0.7)"
              width="100%"
              height="100%"
              color="white"
              p={4}
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
            <Box>
              <Image width="256px" src={PlotImage} />
            </Box>
          </Card>
        ))}
      </Flex>
    </>
  );
};
