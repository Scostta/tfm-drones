import React, { useState } from 'react';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import PlotImage from '../../../../assets/land.png';
import { Card } from '../../../../components/core/UI/Card';
import { PlotForm } from '../Form';
import { useGetUserPlots } from '../../../../hooks/PlotContract/useGetUserPlots';

export const Plots: React.FC = () => {
  const [modalOpen, modalOpenSet] = useState<boolean>(false);
  const { data = [], loading, error } = useGetUserPlots(true);

  return (
    <>
      <PlotForm open={modalOpen} onClose={() => modalOpenSet(false)} />
      <Flex mb={2} justify="flex-end">
        <Button onClick={() => modalOpenSet(true)}>Register Plot</Button>
      </Flex>
      <Flex flexWrap="wrap" justify="flex-start" gap={4}>
        {data?.map((plot, i) => (
          <Card key={i} cursor="pointer">
            <Box>
              <Image width="256px" src={PlotImage} />
            </Box>
          </Card>
        ))}
      </Flex>
    </>
  );
};
