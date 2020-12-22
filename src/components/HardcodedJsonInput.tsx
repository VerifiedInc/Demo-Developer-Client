import React, { FC } from 'react';

import JsonInput from './JsonInput';
import { noop } from '../utils/noop';

export interface HardcodedJsonInputProps {
  inputId: string;
  labelText: string;
  value: string;
}

const HardcodedJsonInput: FC<HardcodedJsonInputProps> = ({
  inputId = '',
  labelText = '',
  value = ''
}) => {
  return (
    <JsonInput
      inputId={inputId}
      labelText={labelText}
      value={value}
      onChange={noop}
      isEditable={false}
    />
  );
};

export default HardcodedJsonInput;
