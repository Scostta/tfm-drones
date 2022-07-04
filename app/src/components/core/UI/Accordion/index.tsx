import { Box, Spinner } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import React, { ReactNode, useState } from 'react';
import * as S from './styles';

type AccordionProps = {
  title?: string | ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  isLoading?: boolean;
};

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen,
  isLoading,
}) => {
  const [open, openSet] = useState(!!defaultOpen);
  return (
    <S.Accordion>
      <S.Title onClick={() => openSet(!open)}>
        <Box width="100%">{title}</Box>
        {isLoading ? (
          <Spinner />
        ) : open ? (
          <ChevronUpIcon />
        ) : (
          <ChevronDownIcon />
        )}
      </S.Title>
      <S.Content open={open}>{children}</S.Content>
    </S.Accordion>
  );
};
