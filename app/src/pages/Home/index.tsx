import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SectionContainer } from '../../components/core/UI/SectionContainer';
import { Plots } from './components/Plots';
import { PlotForm } from './components/Form';
import { ModalDrone } from './components/ModalDrone';
import { Jobs } from '../Admin/Dashboard/components/Jobs';

export const Home: React.FC = () => {
  const [modalOpen, modalOpenSet] = useState<boolean>(false);

  return (
    <>
      <SectionContainer>
        <ModalDrone />
        <PlotForm open={modalOpen} onClose={() => modalOpenSet(false)} />
        <Flex mb={2} justify="flex-end">
          <Button onClick={() => modalOpenSet(true)}>Register Plot</Button>
        </Flex>
        <Plots />
      </SectionContainer>
      <SectionContainer>
        <Jobs />
      </SectionContainer>
    </>
  );
};
