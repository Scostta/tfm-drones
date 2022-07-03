import React, { useState } from 'react';
import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Form } from '../../../../components/core/UI/Form';
import { Modal } from '../../../../components/core/UI/Modal';
import { useCreatePlot } from '../../../../hooks/PlotContract/useCreatePlot';

type PlotFormProps = {
  open: boolean;
  onClose: () => void;
};

export const PlotForm: React.FC<PlotFormProps> = ({ open, onClose }) => {
  const [values, valuesSet] = useState({});
  const { error, loading, create, cleanError } = useCreatePlot(onClose);

  const handleOnChange = (key: string, value: any) => {
    cleanError();
    valuesSet((v) => ({
      ...v,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    console.log(values);
    create(values);
  };

  if (!open) return null;
  return (
    <Modal
      isOpen={true}
      title={'Register new Plot'}
      onClose={onClose}
      onCancel={onClose}
      onModalAccept={onSubmit}
      isLoading={loading}
    >
      <Form>
        <FormControl>
          <FormLabel>Owner Name</FormLabel>
          <Input
            onChange={(e) => handleOnChange('ownerName', e.target.value)}
            name="ownerName"
            placeholder="type here"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Pesticide needed</FormLabel>
          <Select
            onChange={(e) => handleOnChange('pesticide', e.target.value)}
            name="pesticide"
            placeholder="choose one"
          >
            <option value="pesticide A">Pesticide A</option>
            <option value="pesticide B">Pesticide B</option>
            <option value="pesticide C">Pesticide C</option>
            <option value="pesticide D">Pesticide D</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Allowed Maximum Flight Altitude</FormLabel>
          <Input
            onChange={(e) =>
              handleOnChange('allowedMaxFlightAltitude', e.target.value)
            }
            name="allowedMaxFlightAltitude"
            placeholder="number"
            type="number"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Allowed Minimum Flight Altitude</FormLabel>
          <Input
            onChange={(e) =>
              handleOnChange('allowedMinFlightAltitude', e.target.value)
            }
            name="allowedMinFlightAltitude"
            placeholder="number"
            type="number"
          />
        </FormControl>

        <FormLabel color="red">{error}</FormLabel>
      </Form>
    </Modal>
  );
};
