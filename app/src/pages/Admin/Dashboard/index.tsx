import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { SectionContainer } from '../../../components/core/UI/SectionContainer';
import { Drones } from './components/Drones';
import { Aside } from './components/Aside';
import { Jobs } from './components/Jobs';
import { useAtomValue } from 'jotai';
import { isAdminAtom } from '../../../store/admin';

export const Dashboard: React.FC = () => {
  const isAdmin = useAtomValue(isAdminAtom);

  if (!isAdmin) return null;

  return (
    <Flex width="100%" height="100%" justify="space-around">
      <Box width="70%">
        <SectionContainer>
          <Drones />
        </SectionContainer>
        <SectionContainer>
          <Jobs isAdmin={true} />
        </SectionContainer>
      </Box>
      <Aside />
    </Flex>
  );
};
