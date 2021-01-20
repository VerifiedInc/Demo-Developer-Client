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
  inputErrors?: Record<'username', string>;
}

const UsernameStep: FC<UsernameStepProps> = ({
  username = '',
  userResult = '',
  handleSubmit = noop,
  handleUsernameChange = noop,
  inputErrors = { username: '' }
}) => {
  const header = '1. Log in with your username.';
  const description = 'Enter the username the mobile app generated for you. This login is just a setup step for the demo. You wouldn\'t normally do this when implementing Unum ID.';
  const usernameDescription = <>Identifier internal to your systems. For this demo, the mobile app generates a random one for you. (Type it in here.)</>;
  const userResultExplanation = (
    <>
      As an Unum ID customer, you associate your internal user identifier with a DID (decentralized identifier),
      which identifies the user in Unum ID.
    </>
  );
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
            description={usernameDescription}
            errorMessage={inputErrors['username']}
          />
          <SubmitButton onClick={handleSubmit} disabled={username.length === 0} text='Log In' />
        </form>
      </StepLeft>
      <StepRight>
        <JsonResult
          value={userResult}
          disabled={!userResult}
          label='Logged In User'
          description={userResultExplanation}
        />
      </StepRight>
    </Step>
  );
};

export default UsernameStep;
