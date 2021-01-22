import React, { FC, MouseEventHandler } from 'react';

import Step from './Step';
import StepLeft from './StepLeft';
import StepRight from './StepRight';
import HardcodedInput from './HardcodedInput';
import SubmitButton from './SubmitButton';
import JsonResult from './JsonResult';
import Bold from './Bold';
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
      In this step, you&apos;ll act as the issuer (ACME Bank) again.
      You can (optionally) revoke the credential you issued.
      You might do this, for example, to issue a new version of the credential
      when the user updates their account information.
    </>
  );

  const credentialIdDescription = (
    <>
      All you need to revoke a credential is its identifier,
      though you&apos;ll usually want to store the full credential
      to make it easier to find the correct identifier.
    </>
  );

  const resultDescription = (
    <>
      Whether the credential&apos;s status has successfully been changed to revoked.
      (Note that we <Bold>never</Bold> have access to the raw credential data!
      The Server SDK encrypts it before sending it to Unum ID.
      We temporarily store that encrypted version, until the user&apos;s mobile app retrieves it.)
    </>
  );

  return (
    <Step header={header} description={description}>
      <StepLeft>
        <form>
          <fieldset disabled={disabled}>
            <HardcodedInput
              inputId='credential-id'
              labelText='credential ID'
              value={credentialId}
              description={credentialIdDescription}
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
          description={resultDescription}
        />
      </StepRight>
    </Step>
  );
};

export default RevokeStep;
