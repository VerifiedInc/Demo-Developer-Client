import React, { FC, MouseEventHandler } from 'react';

import Button from './SubmitButton';
import { noop } from '../utils/noop';

interface LogoutProps {
  logout: MouseEventHandler;
}

const Logout: FC<LogoutProps> = ({ logout = noop }) => {
  return (
    <div className='logout'>
      <Button onClick={logout} text='Log Out' />
    </div>
  );
};

export default Logout;
