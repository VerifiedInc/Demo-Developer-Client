import React, { FC } from 'react';

import Input from './Input';
import { noop } from '../utils/noop';

export interface HardcodedInputProps {
  inputId: string;
  type?: string;
  labelText: string;
  value: string;
}

const HardcodedInput: FC<HardcodedInputProps> = ({
  inputId = '',
  type = 'text',
  labelText = '',
  value = ''
}) => {
  return (
    <Input
      inputId={inputId}
      type={type}
      isEditable={false}
      value={value}
      labelText={labelText}
      onChange={noop}
    />
  );
};

export default HardcodedInput;
