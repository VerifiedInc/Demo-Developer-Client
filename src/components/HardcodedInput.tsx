import React, { FC, ReactNode } from 'react';

import Input from './Input';
import { noop } from '../utils/noop';

export interface HardcodedInputProps {
  inputId: string;
  type?: string;
  labelText: string;
  value: string;
  description?: ReactNode;
}

const HardcodedInput: FC<HardcodedInputProps> = ({
  inputId = '',
  type = 'text',
  labelText = '',
  value = '',
  description = undefined
}) => {
  return (
    <Input
      inputId={inputId}
      type={type}
      isEditable={false}
      value={value}
      labelText={labelText}
      onChange={noop}
      description={description}
    />
  );
};

export default HardcodedInput;
