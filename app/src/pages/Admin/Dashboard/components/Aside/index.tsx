import { useAtomValue } from 'jotai';
import React from 'react';
import { droneSelectedAtom } from '../../../../../store/drones';
import { Card } from '../../../../../components/core/UI/Card';
import { SectionContainer } from '../../../../../components/core/UI/SectionContainer';
import DroneImage from '../../../../../assets/dronepng.png';
import { Flex, Image, Text } from '@chakra-ui/react';

export const Aside: React.FC = () => {
  const selectedDron = useAtomValue(droneSelectedAtom);

  return (
    <Card width="20%">
      <SectionContainer p={'2em 1em'}>
        {!selectedDron ? (
          <Flex justify="center">
            Para ver los detalles de un dron selecciona clicando uno en la lista
          </Flex>
        ) : (
          <Flex gap={4} direction="column">
            <Image src={DroneImage}></Image>
            <Flex direction="column" gap={4}>
              <Flex direction="column">
                <Text fontWeight="bold">Model:</Text>
                <Text>{selectedDron.model}</Text>
              </Flex>
              <Flex direction="column">
                <Text fontWeight="bold">Max. Flight Altitude</Text>
                <Text>{selectedDron.maxFlightAltitude}</Text>
              </Flex>
              <Flex direction="column">
                <Text fontWeight="bold">Min. Flight Altitude</Text>
                <Text>{selectedDron.minFlightAltitude}</Text>
              </Flex>
              <Flex direction="column">
                <Text fontWeight="bold">Pesticides</Text>
                <Text>{selectedDron.pesticides?.join(', ')}</Text>
              </Flex>
            </Flex>
          </Flex>
        )}
      </SectionContainer>
    </Card>
  );
};
