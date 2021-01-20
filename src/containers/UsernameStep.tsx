import React, { ChangeEvent, FC, MouseEventHandler, useState, useEffect } from 'react';

import UsernameStep from '../components/UsernameStep';
import { useUser, loginUser } from '../context/user';

const UsernameStepContainer: FC = () => {
  const [username, setUsername] = useState('');
  const [userState, userDispatch] = useUser();
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({ username: '' });

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

    if (username.length < 1) {
      setInputErrors({ ...inputErrors, username: 'required' });
      return;
    }
    console.log('username', username);

    try {
      await loginUser(userDispatch, username);
      setInputErrors({ ...inputErrors, username: '' });
    } catch (e) {
      setInputErrors({ ...inputErrors, username: e.message });
    }
  };

  return (
    <UsernameStep
      handleUsernameChange={handleUsernameChange}
      handleSubmit={handleSubmit}
      userResult={userResult}
      username={username}
      inputErrors={inputErrors}
    />
  );
};

export default UsernameStepContainer;
