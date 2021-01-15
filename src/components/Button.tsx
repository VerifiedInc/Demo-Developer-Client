import React, { FC, MouseEventHandler } from 'react';

import { noop } from '../utils/noop';
import './Button.css';

export interface ButtonProps {
  onClick: MouseEventHandler;
  disabled?: boolean;
  text: string;
}

const Button: FC<ButtonProps> = ({
  onClick = noop,
  disabled = false,
  text = 'click me'
}) => {
  return (
    <button
      className='button'
      type='button'
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
