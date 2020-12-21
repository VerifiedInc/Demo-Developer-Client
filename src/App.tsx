import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Step from './components/Step';
import StepLeft from './components/StepLeft';
import StepRight from './components/StepRight';
import Input from './components/Input';
import SubmitButton from './components/SubmitButton';
import Result from './components/Result';

function App () {
  const [username, setUsername] = React.useState('');
  const [usernameResult, setUsernameResult] = React.useState('');

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setUsernameResult(username);
  };

  return (
    <div className='App'>
      <Step header='1. Enter Username'>
        <StepLeft>
          <form>
            <Input
              labelText='Username'
              value={username}
              onChange={onUsernameChange}
              inputId='username'
            />
            <SubmitButton onClick={onSubmit} />
          </form>
        </StepLeft>
        <StepRight>
          <Result value={usernameResult} disabled={!usernameResult} label='Username' />
        </StepRight>
      </Step>
    </div>
  );
}

export default App;
