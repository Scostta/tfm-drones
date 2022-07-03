import React from 'react';
import { Flex, HStack, Tag } from '@chakra-ui/react';
import { useGetJobs } from '../../../../../hooks/ManagerContract/useGetJobs';
import { Accordion } from '../../../../../components/core/UI/Accordion';
import { Card } from '../../../../../components/core/UI/Card';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

export const Jobs: React.FC = () => {
  const { data = [], loading } = useGetJobs(true);
  console.log(data, '-------- FROM COMPONENT');

  return (
    <>
      <Accordion
        title={<div>Total: {data.length}</div>}
        defaultOpen={true}
        isLoading={loading}
      >
        {!data.length ? (
          <Flex justify="center" display={loading ? 'none' : 'flex'}>
            No hay trabajos pendientes
          </Flex>
        ) : (
          <Flex flexWrap="wrap" justify="flex-start" gap={4}>
            {data?.map((job, i) => (
              <Card key={i} width="100%" padding={4}>
                <Flex justify="space-between">
                  <div>
                    {`Drone Id ${job.droneId} ----> Plot Id ${job.plotId}`}
                  </div>
                  <Tag colorScheme={job.approved ? 'green' : 'blue'}>
                    {job.approved ? 'Approved' : 'Pending'}
                  </Tag>
                  <HStack gap={2}>
                    <CheckIcon color="green" />
                    <CloseIcon color="red" />
                  </HStack>
                </Flex>
              </Card>
            ))}
          </Flex>
        )}
      </Accordion>
    </>
  );
};
