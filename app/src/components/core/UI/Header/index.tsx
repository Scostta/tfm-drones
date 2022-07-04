import React from 'react';
import { Button, Flex, StackProps } from '@chakra-ui/react';
import { useMetamask } from '../../../../hooks/useMetamask';
import { useAdmin } from '../../../../hooks/ManagerContract/useAdmin';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isAdminAtom } from '../../../../store/admin';

export const Header: React.FC<StackProps> = () => {
  const { connect, currentAccount } = useMetamask();
  const isAdmin = useAtomValue(isAdminAtom);
  const { setAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex
      justify="space-between"
      padding={4}
      backgroundColor="lightgray"
      align="center"
    >
      <div>
        {!isAdmin ? (
          <Button onClick={setAdmin}>Hazme Admin!</Button>
        ) : (
          <div>
            {location.pathname !== '/admin' && (
              <Button variant="link" onClick={() => navigate('/admin')}>
                Ver Dashboard
              </Button>
            )}
          </div>
        )}
      </div>
      <div>
        {!currentAccount ? (
          <Button onClick={connect}>Connect</Button>
        ) : (
          <div>Cuenta conectada: {currentAccount}</div>
        )}
      </div>
    </Flex>
  );
};
