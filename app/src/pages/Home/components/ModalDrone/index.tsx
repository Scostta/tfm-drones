import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { useGetDrones } from '../../../../hooks/DroneContract/useGetDrones';
import DroneImage from '../../../../assets/dronepng.png';
import { Card } from '../../../../components/core/UI/Card';
import { Modal } from '../../../../components/core/UI/Modal';
import { useAtom } from 'jotai';
import { plotSelectedAtom } from '../../../../store/plots';
import { useCreateJob } from '../../../../hooks/ManagerContract/useCreateJob';

export const ModalDrone: React.FC = () => {
  const [selectedPlot, selectedPlotSet] = useAtom(plotSelectedAtom);
  const { data = [], loading } = useGetDrones(true);
  const { create } = useCreateJob();

  if (!selectedPlot) return null;
  return (
    <Modal
      isOpen={true}
      title={'Escoge un dron disponible para fumigar la parcela'}
      onClose={() => selectedPlotSet(null)}
      isLoading={loading}
    >
      <Flex flexWrap="wrap" justify="center" gap={4}>
        {data
          ?.filter(
            (drone) =>
              (selectedPlot?.allowedMaxFlightAltitude || 0) >=
                (drone?.maxFlightAltitude || 0) &&
              (selectedPlot?.allowedMinFlightAltitude || 0) <=
                (drone?.minFlightAltitude || 0)
          )
          .map((drone, i) => (
            <Card key={i} cursor="pointer">
              <Box>
                <Image width="150px" height="150px" src={DroneImage}></Image>
              </Box>
              <Box>
                <div>Max altitude: {drone.maxFlightAltitude}</div>
                <div>Min altitude: {drone.minFlightAltitude}</div>
                <div>Velocity: {drone.velocity}</div>
                <div>Cost: {drone.cost}</div>
              </Box>
            </Card>
          ))}
      </Flex>
    </Modal>
  );
};
