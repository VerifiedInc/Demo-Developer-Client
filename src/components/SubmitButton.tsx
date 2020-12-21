import React, { FC, MouseEventHandler } from 'react';

import { noop } from '../utils/noop';
import './SubmitButton.css';

export interface SubmitButtonProps {
  onClick: MouseEventHandler;
  disabled?: boolean;
  text?: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  onClick = noop,
  disabled = false,
  text = 'Submit'
}) => {
  return (
    <button
      className='submit-button'
      type='submit'
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
