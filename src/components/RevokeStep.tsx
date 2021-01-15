import React, { FC, MouseEventHandler } from 'react';

import Step from './Step';
import StepLeft from './StepLeft';
import StepRight from './StepRight';
import HardcodedInput from './HardcodedInput';
import SubmitButton from './SubmitButton';
import JsonResult from './JsonResult';
import { CredentialStatus } from '../types';
import { noop } from '../utils/noop';

interface RevokeStepProps {
  credentialId?: string;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  credentialStatus?: CredentialStatus;
  disabled: boolean;
}

const RevokeStep: FC<RevokeStepProps> = ({
  credentialId = '',
  handleSubmit = noop,
  credentialStatus = undefined,
  disabled = true
}) => {
  return (
    <Step header='7. (OPTIONAL) Issuer revokes credential.'>
      <StepLeft>
        <form>
          <fieldset disabled={disabled}>
            <HardcodedInput
              inputId='credential-id'
              labelText='credentialId'
              value={credentialId}
            />
            <SubmitButton
              onClick={handleSubmit}
              text='Revoke Credential'
            />
          </fieldset>
        </form>
      </StepLeft>
      <StepRight>
        <JsonResult
          value={JSON.stringify(credentialStatus)}
          label='Result'
          disabled={!credentialStatus}
        />
      </StepRight>
    </Step>
  );
};

export default RevokeStep;
