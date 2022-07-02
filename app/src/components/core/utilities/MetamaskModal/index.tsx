import React from 'react';
import { Modal } from '../../UI/Modal';
import MetamaskImage from '../../../../assets/metamask.png';
import { Button, Flex, HStack, Image } from '@chakra-ui/react';
import { useMetamask } from '../../../../hooks/useMetamask';

export const MetamaskModal: React.FC = () => {
  const { isConnected, connect } = useMetamask();

  const openDownloadLink = () =>
    window.open(
      'https://metamask.io/download/',
      '_blank',
      'noopener,noreferrer'
    );

  return (
    <>
      <Modal isOpen={!isConnected} title="Connect Metamask">
        <Flex align="center" direction="column">
          <p>Please connect a metamask wallet to use the app</p>
          <Image src={MetamaskImage} width="400px" />
          <HStack>
            <Button variant="link" onClick={openDownloadLink}>
              Do not have it? Download from here
            </Button>
            <Button onClick={connect}>Connect</Button>
          </HStack>
        </Flex>
      </Modal>
    </>
  );
};
