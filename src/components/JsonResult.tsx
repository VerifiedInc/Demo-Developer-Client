import React, { FC, ReactNode } from 'react';
import ReactJsonView from 'react-json-view';

import Description from './Description';
import Italic from './Italic';
import LatoLight from './LatoLight';
import './JsonResult.css';

export interface JsonResultProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  label: string;
  description?: ReactNode;
}

const JsonResult: FC<JsonResultProps> = ({
  value = undefined,
  placeholder = '',
  disabled = false,
  label = '',
  description = undefined
}) => {
  const className = `json-result${disabled ? ' disabled' : ''}`;

  return (
    <div className={className}>
      <div className='json-result-label'>{label}</div>
      {description && <Description><Italic><LatoLight>{description}</LatoLight></Italic></Description>}
      <div className='json-result-box'>
        {
          disabled
            ? placeholder
            : (
                value && (
                  <ReactJsonView
                    src={value}
                    name={null}
                    enableClipboard={false}
                    displayObjectSize={false}
                    displayDataTypes={false}
                    collapsed={1}
                  />
                )
              )
        }
      </div>
    </div>
  );
};

export default JsonResult;
