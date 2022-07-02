import React from 'react';
import { RouteProps } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from '../../../components/core/UI/Header';
import { MetamaskModal } from '../../../components/core/utilities/MetamaskModal';

export const Layout: React.FC<RouteProps> = ({ children }) => {
  return (
    <Box width="100%" height="100%">
      <MetamaskModal />
      <Flex flexDirection="column" height="100%">
        <Header />
        {children}
      </Flex>
    </Box>
  );
};
