import React, { ChangeEventHandler, FC, MouseEventHandler } from 'react';

import Step from './Step';
import StepLeft from './StepLeft';
import StepRight from './StepRight';
import Input from './Input';
import SubmitButton from './SubmitButton';
import JsonResult from './JsonResult';
import { noop } from '../utils/noop';

export interface UsernameStepProps {
  handleUsernameChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: MouseEventHandler;
  userResult: string;
  username: string;
}

const UsernameStep: FC<UsernameStepProps> = ({
  username = '',
  userResult = '',
  handleSubmit = noop,
  handleUsernameChange = noop
}) => {
  const header = '1. Log in with your username.';
  const description = 'Enter the username the mobile app generated for you. This login is just a setup step for the demo. You wouldn\'t normally do this when implementing Unum ID.';

  return (
    <Step header={header} description={description}>
      <StepLeft>
        <form>
          <Input
            inputId='username'
            labelText='Username'
            isEditable
            value={username}
            onChange={handleUsernameChange}
          />
          <SubmitButton onClick={handleSubmit} disabled={username.length === 0} text='Log In' />
        </form>
      </StepLeft>
      <StepRight>
        <JsonResult
          value={userResult}
          disabled={!userResult}
          label='Logged In User'
        />
      </StepRight>
    </Step>
  );
};

export default UsernameStep;
