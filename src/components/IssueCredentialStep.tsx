import React, {
  FC,
  MouseEventHandler,
  ChangeEventHandler
} from 'react';

import Step from './Step';
import StepLeft from './StepLeft';
import StepRight from './StepRight';
import Input from './Input';
import HardcodedInput from './HardcodedInput';
import JsonInput from './JsonInput';
import Result from './Result';
import JsonResult from './JsonResult';
import SubmitButton from './SubmitButton';
import { noop } from '../utils/noop';
import { Credential, Issuer, User } from '../types';

export interface IssueCredentialStepProps {
  disabled: boolean;
  issuer?: Issuer;
  expirationDate: string;
  handleExpirationDateChange: ChangeEventHandler<HTMLInputElement>;
  credentialType: string;
  handleCredentialTypeChange: ChangeEventHandler<HTMLInputElement>;
  user?: User;
  claims: string;
  handleClaimsChange: ChangeEventHandler<HTMLTextAreaElement>;
  handleSubmit: MouseEventHandler;
  credential?: Credential;
}
const IssueCredentialStep: FC<IssueCredentialStepProps> = ({
  disabled = true,
  issuer = undefined,
  expirationDate = '',
  handleExpirationDateChange = noop,
  credentialType = '',
  handleCredentialTypeChange = noop,
  user = undefined,
  claims = '',
  handleClaimsChange = noop,
  handleSubmit = noop,
  credential = undefined
}) => {
  return (
    <Step header='2. Issue a Credential'>
      <StepLeft>
        <form>
          <fieldset disabled={disabled}>
            <HardcodedInput
              inputId='issuer-did'
              labelText='Issuer DID'
              value={issuer?.did as string}
            />
            <Input
              inputId='credential-expiration'
              type='date'
              labelText='Expiration Date'
              isEditable
              value={expirationDate}
              onChange={handleExpirationDateChange}
            />
            <Input
              inputId='credential-type'
              type='text'
              labelText='Credential Type'
              isEditable
              value={credentialType}
              onChange={handleCredentialTypeChange}
            />

            <JsonInput
              inputId='credential-data'
              labelText='Credential Data'
              isEditable={!!user}
              value={claims}
              onChange={handleClaimsChange}
            />

            <SubmitButton onClick={handleSubmit} text='Issue Credential' />
          </fieldset>
        </form>
      </StepLeft>
      <StepRight>
        <Result
          value={credential?.id}
          label='Credential ID'
          disabled={!credential}
        />
        <JsonResult
          value={JSON.stringify(credential)}
          label='Credential'
          disabled={!credential}
        />
      </StepRight>
    </Step>
  );
};

export default IssueCredentialStep;
