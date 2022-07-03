import React, { useState } from 'react';
// import { Controller } from 'react-hook-form';
// import { useUsersForm } from './useForm';
import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Form } from '../../../../../components/core/UI/Form';
import { Modal } from '../../../../../components/core/UI/Modal';
import { useCreateDrone } from '../../../../../hooks/DroneContract/useCreateDrone';

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
    create({ ...values, pesticides: ['pesticide-a'] });
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
          <FormLabel>Owner Name</FormLabel>
          <Input
            onChange={(e) => handleOnChange('ownerName', e.target.value)}
            name="ownerName"
            placeholder="type here"
          />
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
          <FormLabel>Accepted Pesticides</FormLabel>
          <Select
            onChange={(e) => handleOnChange('pesticides', e.target.value)}
            name="pesticides"
            placeholder="choose one"
          >
            <option value="pesticide A">Pesticide A</option>
            <option value="pesticide B">Pesticide B</option>
            <option value="pesticide C">Pesticide C</option>
            <option value="pesticide D">Pesticide D</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Maximum Flight Altitude</FormLabel>
          <Input
            onChange={(e) =>
              handleOnChange('maxFlightAltitude', e.target.value)
            }
            name="maxFlightAltitude"
            placeholder="number"
            type="number"
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
            type="number"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Cost</FormLabel>
          <Input
            onChange={(e) => handleOnChange('cost', e.target.value)}
            name="cost"
            placeholder="number"
            type="number"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Velocity</FormLabel>
          <Input
            onChange={(e) => handleOnChange('velocity', e.target.value)}
            name="velocity"
            placeholder="number"
            type="number"
          />
        </FormControl>

        <FormLabel color="red">{error}</FormLabel>
      </Form>
    </Modal>
  );
};
