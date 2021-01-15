import React, { FC } from 'react';

import './Result.css';

export interface ResultProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  label: string;
}

const Result: FC<ResultProps> = ({
  value = '',
  placeholder = '',
  disabled = false,
  label = ''
}) => {
  const className = `result${disabled ? ' disabled' : ''}`;
  return (
    <div className={className}>
      <div className='result-label'>{label}</div>
      <div className='result-box'>
        <span className='result-value'>{ disabled ? placeholder : value }</span>
      </div>
    </div>
  );
};

export default Result;
