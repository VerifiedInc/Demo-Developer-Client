import React, { FC, ReactNode } from 'react';

import Description from './Description';
import Italic from './Italic';
import LatoLight from './LatoLight';
import './Result.css';

export interface ResultProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  label: string;
  description?: ReactNode;
}

const Result: FC<ResultProps> = ({
  value = '',
  placeholder = '',
  disabled = false,
  label = '',
  description = undefined
}) => {
  const className = `result${disabled ? ' disabled' : ''}`;
  return (
    <div className={className}>
      <div className='result-label'>{label}</div>
      { description && <Description><Italic><LatoLight>{description}</LatoLight></Italic></Description> }
      <div className='result-box'>
        <span className='result-value'>{ disabled ? placeholder : value }</span>
      </div>
    </div>
  );
};

export default Result;
