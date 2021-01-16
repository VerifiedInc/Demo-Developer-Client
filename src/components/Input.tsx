import React, { FC, ChangeEventHandler, ReactNode } from 'react';

import { noop } from '../utils/noop';
import Italic from './Italic';
import Description from './Description';
import './Input.css';
import LatoLight from './LatoLight';

export interface InputProps {
  inputId: string;
  type?: string;
  labelText: string;
  isEditable?: boolean;
  value: string;
  placeholderText?: string;
  description?: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  inputId = '',
  type = 'text',
  labelText = '',
  isEditable = true,
  value = '',
  placeholderText = labelText,
  description = undefined,
  onChange = noop
}) => {
  return (
    <div className='input'>
      <label htmlFor={inputId}>
        <div className='input-label'>{labelText}</div>
        { description && <Description><Italic><LatoLight>{description}</LatoLight></Italic></Description> }
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
