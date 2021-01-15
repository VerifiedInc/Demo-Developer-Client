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
  const header = '7. (OPTIONAL) Issuer revokes credential.';
  const description = (
    <>
      In this step, ypu&apos;ll act as the issuer again.
      You can (optionally) revoke the credential you issued.
      You might do this, for example, to issue a new version of the credential.
    </>
  );

  return (
    <Step header={header} description={description}>
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
