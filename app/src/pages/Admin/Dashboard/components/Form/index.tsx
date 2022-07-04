import React, { useState } from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';
import { Form } from '../../../../../components/core/UI/Form';
import { Modal } from '../../../../../components/core/UI/Modal';
import { useCreateDrone } from '../../../../../hooks/DroneContract/useCreateDrone';
import { Select } from 'chakra-react-select';

type DroneFormProps = {
  open: boolean;
  onClose: () => void;
};

export const DroneForm: React.FC<DroneFormProps> = ({ open, onClose }) => {
  const [values, valuesSet] = useState({});
  const { error, loading, create, cleanError } = useCreateDrone(onClose);

  const checkIsValid = () => {
    const {
      ownerName,
      model,
      maxFlightAltitude,
      minFlightAltitude,
      pesticides,
      cost,
    } = values as any;

    return (
      ownerName?.length &&
      model?.length &&
      maxFlightAltitude?.toString().length &&
      minFlightAltitude?.toString().length &&
      pesticides?.length &&
      cost?.length
    );
  };

  const handleOnChange = (key: string, value: any) => {
    cleanError();
    valuesSet((v) => ({
      ...v,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    create(values);
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
      disabled={!checkIsValid()}
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
            onChange={(value: any) =>
              handleOnChange(
                'pesticides',
                value.map((v: any) => v.value)
              )
            }
            name="pesticides"
            placeholder="choose one"
            options={[
              { label: 'Pesticide A', value: 'pesticide A' },
              { label: 'Pesticide B', value: 'pesticide B' },
              { label: 'Pesticide C', value: 'pesticide C' },
              { label: 'Pesticide D', value: 'pesticide D' },
            ]}
            isMulti
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

        <FormLabel color="red">{error}</FormLabel>
      </Form>
    </Modal>
  );
};
