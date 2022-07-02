import React, { ReactNode } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import * as S from './styles';

interface ModalProps {
  title: string | ReactNode;
  onModalAccept?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  isLoading,
  children,
  onCancel,
  onModalAccept,
}) => {
  if (!isOpen) return null;
  return (
    <S.Modal>
      <S.ModalContent>
        <S.ModalTitle>
          <div>{title}</div>
          {onClose && (
            <CloseIcon
              onClick={(!isLoading && onClose) || (() => {})}
              cursor={isLoading ? 'not-allowed' : 'pointer'}
            />
          )}
        </S.ModalTitle>
        <S.ModalBody>{children}</S.ModalBody>
        <S.ModalFooter>
          {onModalAccept && (
            <HStack>
              {!!onCancel && (
                <Button
                  disabled={isLoading}
                  colorScheme="corporateBlack"
                  onClick={onCancel}
                  color="black"
                >
                  Cancel
                </Button>
              )}
              <Button isLoading={isLoading} onClick={onModalAccept}>
                Save
              </Button>
            </HStack>
          )}
        </S.ModalFooter>
      </S.ModalContent>
    </S.Modal>
  );
};
