import React, { FC, ReactNode } from 'react';

import JsonInput from './JsonInput';
import { noop } from '../utils/noop';

export interface HardcodedJsonInputProps {
  inputId: string;
  labelText: string;
  value: string;
  description?: ReactNode;
}

const HardcodedJsonInput: FC<HardcodedJsonInputProps> = ({
  inputId = '',
  labelText = '',
  value = '',
  description = undefined
}) => {
  return (
    <JsonInput
      inputId={inputId}
      labelText={labelText}
      value={value}
      onChange={noop}
      isEditable={false}
      description={description}
    />
  );
};

export default HardcodedJsonInput;
