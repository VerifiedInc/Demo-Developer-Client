import React, { FC, MouseEventHandler } from 'react';

import { logoutUser, useUserDispatch } from '../context/user';
import Logout from '../components/Logout';

const LogoutContainer: FC = () => {
  const userDispatch = useUserDispatch();

  const logout: MouseEventHandler<HTMLButtonElement> = () => {
    logoutUser(userDispatch);
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <Logout logout={logout} />
  );
};

export default LogoutContainer;
