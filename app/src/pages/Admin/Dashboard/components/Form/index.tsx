import React, { FormEvent, FormEventHandler, useState } from 'react';
// import { Controller } from 'react-hook-form';
// import { useUsersForm } from './useForm';
import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Form } from '../../../../../components/core/UI/Form';
import { Modal } from '../../../../../components/core/UI/Modal';
import { useCreateDrone } from '../../../../../hooks/useCreateDrone';

type DroneFormProps = {
  open: boolean;
  onClose: () => void;
};

export const DroneForm: React.FC<DroneFormProps> = ({ open, onClose }) => {
  const [values, valuesSet] = useState({});
  const { error, loading, create, cleanError } = useCreateDrone(onClose);

  const handleOnChange = (key: string, value: any) => {
    cleanError();
    valuesSet((v) => ({
      ...v,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    create({ ...values, pesticides: ['pesticide A'] });
  };

  if (!open) return null;
  return (
    <Modal
      isOpen={true}
      title={'Register new drone'}
      onClose={onClose}
      onCancel={onClose}
      onModalAccept={onSubmit}
      isLoading={loading}
    >
      <Form>
        <FormControl>
          <FormLabel>Accepted Pesticides</FormLabel>
          <Select
            onChange={(e) => handleOnChange('pesticides', e.target.value)}
            name="pesticides"
            placeholder="choose one"
          >
            <option value="pesticide-a">Pesticide A</option>
            <option value="pesticide-b">Pesticide B</option>
            <option value="pesticide-c">Pesticide C</option>
            <option value="pesticide-d">Pesticide D</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Model</FormLabel>
          <Input
            onChange={(e) => handleOnChange('model', e.target.value)}
            name="model"
            placeholder="type here"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Maximum Flight Altitude</FormLabel>
          <Input
            onChange={(e) =>
              handleOnChange('maxFlightAltitude', e.target.value)
            }
            name="maxFlightAltitude"
            placeholder="number"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Minimum Flight Altitude</FormLabel>
          <Input
            onChange={(e) =>
              handleOnChange('minFlightAltitude', e.target.value)
            }
            name="minFlightAltitude"
            placeholder="number"
          />
        </FormControl>
        <FormLabel color="red">{error}</FormLabel>
      </Form>
    </Modal>
  );
};
