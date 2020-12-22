import React, { ChangeEventHandler, FC, useState } from 'react';
import TextAreaAutosize from 'react-textarea-autosize';

import { noop } from '../utils/noop';
import './JsonInput.css';

export interface JsonInputProps {
  inputId: string;
  labelText: string;
  isEditable?: boolean;
  value: string;
  placeholderText?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const JsonInput: FC<JsonInputProps> = ({
  inputId = '',
  labelText = '',
  isEditable = true,
  value = '',
  placeholderText = labelText,
  onChange = noop
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
        <TextAreaAutosize
          className={isValid ? 'valid' : 'invalid'}
          id={inputId}
          disabled={!isEditable}
          value={prettifyValue()}
          placeholder={placeholderText}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default JsonInput;
