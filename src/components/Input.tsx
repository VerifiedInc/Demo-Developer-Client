import React, { FC, ChangeEventHandler } from 'react';

import { noop } from '../utils/noop';
import './Input.css';

export interface InputProps {
  inputId: string;
  type?: string;
  labelText: string;
  isEditable?: boolean;
  value: string;
  placeholderText?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  inputId = '',
  type = 'text',
  labelText = '',
  isEditable = true,
  value = '',
  placeholderText = labelText,
  onChange = noop
}) => {
  return (
    <div className='input'>
      <label htmlFor={inputId}>
        <div className='input-label'>{labelText}</div>
        <input
          id={inputId}
          type={type}
          disabled={!isEditable}
          value={value}
          placeholder={placeholderText}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
