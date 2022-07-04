import React from 'react';
import { Checkbox } from '@chakra-ui/react';

interface FilterProps {
  label: string;
  onChange: (val: boolean) => void;
  value: boolean;
}

export const Filter: React.FC<FilterProps> = ({ value, label, onChange }) => {
  return (
    <Checkbox onChange={(e) => onChange(e.target.checked)} isChecked={value}>
      {label}
    </Checkbox>
  );
};
