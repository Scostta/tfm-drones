import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

type CardProps = BoxProps & {
  backgroundColor?: string;
  bgColor?: string;
  bg?: string;
  color?: string;
  active?: boolean;
};

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Box
      boxShadow="rgb(37 40 42 / 20%) 0px 2px 4px 0px"
      padding="2"
      position="relative"
      {...props}
    >
      {children}
    </Box>
  );
};
