import { Stack } from '@chakra-ui/react';
import React from 'react';

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  allRequired?: boolean;
}

export const Form: React.FC<FormProps> = ({
  allRequired = false,
  children,
  ...props
}) => {
  return (
    <form>
      <Stack spacing={6} w="full">
        {children}
      </Stack>
    </form>
  );
};
