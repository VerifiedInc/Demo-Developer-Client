import React, { FC, ReactNode } from 'react';

import Description from './Description';
import Italic from './Italic';
import LatoLight from './LatoLight';
import './JsonResult.css';

export interface JsonResultProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  label: string;
  description?: ReactNode;
}

const JsonResult: FC<JsonResultProps> = ({
  value = '',
  placeholder = '',
  disabled = false,
  label = '',
  description = undefined
}) => {
  const className = `json-result${disabled ? ' disabled' : ''}`;
  const prettifyValue = () => {
    try {
      const result = JSON.stringify(JSON.parse(value), null, 2);
      return result;
    } catch (e) {
      return value;
    }
  };
  return (
    <div className={className}>
      <div className='json-result-label'>{label}</div>
      { description && <Description><Italic><LatoLight>{description}</LatoLight></Italic></Description> }
      <div className='json-result-box'>
        <pre className='json-result-value'>{ disabled ? placeholder : prettifyValue() }</pre>
      </div>
    </div>
  );
};

export default JsonResult;
