import React, { FC, MouseEventHandler } from 'react';

import { logoutUser, useUser } from '../context/user';
import Logout from '../components/Logout';

const LogoutContainer: FC = () => {
  const [userState, userDispatch] = useUser();

  const logout: MouseEventHandler<HTMLButtonElement> = () => {
    logoutUser(userDispatch);
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <Logout logout={logout} disabled={!userState?.user} />
  );
};

export default LogoutContainer;
