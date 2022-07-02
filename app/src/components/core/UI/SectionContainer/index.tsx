import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

interface SectionContainerProps extends FlexProps {}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  justifyContent = 'start',
  flexDirection = 'column',
  children,
  ...props
}) => {
  return (
    <Flex
      id="section"
      justifyContent={justifyContent}
      flexDirection={flexDirection}
      p="2em 3em"
      {...props}
    >
      {children}
    </Flex>
  );
};
