import React, { ChangeEventHandler, FC, ReactNode, useState } from 'react';
import TextAreaAutosize from 'react-textarea-autosize';

import { noop } from '../utils/noop';
import Description from './Description';
import Italic from './Italic';
import LatoLight from './LatoLight';
import ErrorMessage from './ErrorMessage';

import './JsonInput.css';

export interface JsonInputProps {
  inputId: string;
  labelText: string;
  isEditable?: boolean;
  value: string;
  placeholderText?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  description?: ReactNode;
  errorMessage?: string;
}

const JsonInput: FC<JsonInputProps> = ({
  inputId = '',
  labelText = '',
  isEditable = true,
  value = '',
  placeholderText = labelText,
  onChange = noop,
  description = undefined,
  errorMessage = ''
}) => {
  const [isValid, setIsValid] = useState(true);
  const prettifyValue = () => {
    try {
      const result = JSON.stringify(JSON.parse(value), null, 2);
      if (!isValid) {
        setIsValid(true);
      }
      return result;
    } catch (e) {
      if (isValid) {
        setIsValid(false);
      }
      return value;
    }
  };
  return (
    <div className='json-input'>
      <label htmlFor={inputId}>
        <div className='json-input-label'>{labelText}</div>
        {description && <Description><Italic><LatoLight>{description}</LatoLight></Italic></Description>}
        <TextAreaAutosize
          className={isValid ? 'valid' : 'invalid'}
          id={inputId}
          disabled={!isEditable}
          value={prettifyValue()}
          placeholder={placeholderText}
          onChange={onChange}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </label>
    </div>
  );
};

export default JsonInput;
