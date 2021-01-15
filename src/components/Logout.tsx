import React, { FC, MouseEventHandler } from 'react';

import Button from './SubmitButton';
import { noop } from '../utils/noop';

interface LogoutProps {
  logout: MouseEventHandler;
  disabled?: boolean;
}

const Logout: FC<LogoutProps> = ({ logout = noop, disabled = false }) => {
  return (
    <div className='logout'>
      <Button onClick={logout} disabled={disabled} text='Log Out' />
    </div>
  );
};

export default Logout;
