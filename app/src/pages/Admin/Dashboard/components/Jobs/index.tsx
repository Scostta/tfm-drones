import React, { useState } from 'react';
import { Button, Flex, Tag } from '@chakra-ui/react';
import { useGetJobs } from '../../../../../hooks/ManagerContract/useGetJobs';
import { Accordion } from '../../../../../components/core/UI/Accordion';
import { Card } from '../../../../../components/core/UI/Card';
import { useUpdateJob } from '../../../../../hooks/ManagerContract/useUpdateJob';
import { Filter } from '../../../../Home/components/Filter';
import { useAtomValue } from 'jotai';
import { droneSelectedAtom } from '../../../../../store/drones';

interface JobsProps {
  isAdmin?: boolean;
}

export const Jobs: React.FC<JobsProps> = ({ isAdmin }) => {
  const { data = [], loading } = useGetJobs(true);
  const [filterBySelected, filterBySelectedSet] = useState<boolean>(false);
  const selectedDrone = useAtomValue(droneSelectedAtom);

  const { approve } = useUpdateJob();

  return (
    <>
      <Accordion
        title={
          <Flex justify="space-between" width="100%" pr={4}>
            <div>Total: {data.length}</div>
            <Filter
              label="Filtrar según el dron seleccionado"
              value={filterBySelected}
              onChange={filterBySelectedSet}
            />
          </Flex>
        }
        defaultOpen={true}
        isLoading={loading}
      >
        {!data.length ? (
          <Flex justify="center" display={loading ? 'none' : 'flex'}>
            No hay trabajos pendientes
          </Flex>
        ) : (
          <Flex flexWrap="wrap" justify="flex-start" gap={4}>
            {data
              ?.filter((job) => {
                if (filterBySelected) {
                  return job.droneId === selectedDrone?.id;
                }
                return true;
              })
              .map((job, i) => (
                <Card key={i} width="100%" padding={4}>
                  <Flex justify="space-between">
                    <div>
                      {`Drone Id ${job.droneId} ----> Plot Id ${job.plotId}`}
                    </div>
                    <Tag colorScheme={job.approved ? 'green' : 'blue'}>
                      {job.approved ? 'Approved' : 'Pending'}
                    </Tag>

                    {isAdmin && (
                      <Button
                        p={2}
                        colorScheme="green"
                        disabled={job.approved}
                        onClick={() => approve(job?.id)}
                      >
                        Approve
                      </Button>
                    )}
                  </Flex>
                </Card>
              ))}
          </Flex>
        )}
      </Accordion>
    </>
  );
};
