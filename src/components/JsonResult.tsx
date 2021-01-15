import React, { FC } from 'react';
import './JsonResult.css';

export interface JsonResultProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  label: string;
}

const JsonResult: FC<JsonResultProps> = ({
  value = '',
  placeholder = '',
  disabled = false,
  label = ''
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
      <div className='json-result-box'>
        <pre className='json-result-value'>{ disabled ? placeholder : prettifyValue() }</pre>
      </div>
    </div>
  );
};

export default JsonResult;
