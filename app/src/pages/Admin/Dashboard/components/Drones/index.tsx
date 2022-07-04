import React, { useState } from 'react';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { useGetDrones } from '../../../../../hooks/DroneContract/useGetDrones';
import DroneImage from '../../../../../assets/dronepng.png';
import { Accordion } from '../../../../../components/core/UI/Accordion';
import { Card } from '../../../../../components/core/UI/Card';
import { DroneForm } from '../Form';
import { useUpdateAtom } from 'jotai/utils';
import { droneSelectedAtom } from '../../../../../store/drones';

export const Drones: React.FC = () => {
  const [modalOpen, modalOpenSet] = useState<boolean>(false);
  const { data = [], loading } = useGetDrones(true);
  const selectedDronSet = useUpdateAtom(droneSelectedAtom);

  return (
    <>
      <DroneForm open={modalOpen} onClose={() => modalOpenSet(false)} />
      <Flex mb={2} justify="flex-end">
        <Button onClick={() => modalOpenSet(true)}>Register Dron</Button>
      </Flex>
      <Accordion
        title={<div>Total: {data.length}</div>}
        defaultOpen={true}
        isLoading={loading}
      >
        {!data.length ? (
          <Flex justify="center" display={loading ? 'none' : 'flex'}>
            No hay drones registrados
          </Flex>
        ) : (
          <Flex flexWrap="wrap" justify="flex-start" gap={4}>
            {data?.map((drone, i) => (
              <Card
                key={i}
                cursor="pointer"
                onClick={() => selectedDronSet(drone)}
              >
                <Box>
                  <Image src={DroneImage}></Image>
                </Box>
              </Card>
            ))}
          </Flex>
        )}
      </Accordion>
    </>
  );
};
