import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { SectionContainer } from '../../../components/core/UI/SectionContainer';
import { Drones } from './components/Drones';
import { Aside } from './components/Aside';

export const Dashboard: React.FC = () => {
  return (
    <Flex width="100%" height="100%" justify="space-around">
      <Box width="70%">
        <SectionContainer>
          <Drones />
        </SectionContainer>
      </Box>
      <Aside />
    </Flex>
  );
};
