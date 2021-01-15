import React, { ChangeEvent, FC, MouseEventHandler, useState, useEffect } from 'react';

import UsernameStep from '../components/UsernameStep';
import { useUser, loginUser } from '../context/user';

const UsernameStepContainer: FC = () => {
  const [username, setUsername] = useState('');
  const [userState, userDispatch] = useUser();

  useEffect(() => {
    if (!userState?.user) {
      setUsername('');
    }
  }, [userState]);

  const { user } = userState;
  const userResult = user ? JSON.stringify({ username: user?.name, did: user?.did }) : '';

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handleSubmit: MouseEventHandler = async (e): Promise<void> => {
    e.preventDefault();
    console.log('username', username);
    await loginUser(userDispatch, username);
  };

  return (
    <UsernameStep
      handleUsernameChange={handleUsernameChange}
      handleSubmit={handleSubmit}
      userResult={userResult}
      username={username}
    />
  );
};

export default UsernameStepContainer;
