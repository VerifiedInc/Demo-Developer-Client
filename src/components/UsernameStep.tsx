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
  return (
    <Step header='1. Log In with your username'>
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
