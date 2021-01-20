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
import Bold from './Bold';
import ErrorMessage from './ErrorMessage';
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
  inputErrors?: Record<'expirationDate' | 'credentialType' | 'credentialData', string>;
  formError?: string;
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
  credential = undefined,
  inputErrors = { expirationDate: '', credentialType: '', credentialData: '' },
  formError = ''
}) => {
  const header = '2. Issuer issues credential.';
  const description = (
    <>
      In this step, you&apos;ll act as an <Bold>issuer</Bold> to send identity data to a user, using our Server SDK.
      This is called "issuing a credential" &mdash; the credential is stored in the user&apos;s mobile app.
      The issuer in this demo is ACME Bank.
    </>
  );

  const issuerDidDescription = <>Identifies the issuer in Unum ID. You recieve one when you register an issuer using our Server SDK.</>;
  const expirationDateDescription = (
    <>
      Date after which the credential is no longer valid.
      In actual usage, this must be an ISO8601 date/time string,
      but we&apos; using an HTML date input to collect it here.
    </>
  );

  const credentialTypeDescription = (
    <>
      Type of credential.
      While any non-empty string is technically a valid credential type,
      by convention we pick a descriptive name, use CamelCase, and end with 'Credential'.
    </>
  );

  const credentialIdDescription = (
    <>
      Identifies the credential in Unum ID so you (as the issuer) can revoke it later if necessary.
      (Note that we <Bold>never</Bold> have access to the raw credential data!
      The Server SDK encrypts it before sending it to Unum ID.
      We temporarily store that encrypted version, until the user&apos;s mobile app retrieves it.)
    </>
  );

  const credentialDataDescription = <>Any valid JSON. This is the identity data you&apos;re sending to the user.</>;

  const credentialResultDescription = (
    <>
      JSON serialization of the full credential object created by our Server SDK.
      This is then encrypted with the user&apos;s public key before it&apos;s sent to us.
      This ensures we never have access to the user&apos;s data.
    </>
  );

  return (
    <Step header={header} description={description}>
      <StepLeft>
        <form>
          <fieldset disabled={disabled}>
            <HardcodedInput
              inputId='issuer-did'
              labelText='Issuer DID'
              value={issuer?.did as string}
              description={issuerDidDescription}
            />
            <Input
              inputId='credential-expiration'
              type='date'
              labelText='Expiration Date'
              isEditable
              value={expirationDate}
              onChange={handleExpirationDateChange}
              description={expirationDateDescription}
              errorMessage={inputErrors.expirationDate}
            />
            <Input
              inputId='credential-type'
              type='text'
              labelText='Credential Type'
              isEditable
              value={credentialType}
              onChange={handleCredentialTypeChange}
              description={credentialTypeDescription}
              errorMessage={inputErrors.credentialType}
            />

            <JsonInput
              inputId='credential-data'
              labelText='Credential Data'
              isEditable={!!user}
              value={claims}
              onChange={handleClaimsChange}
              description={credentialDataDescription}
              errorMessage={inputErrors.credentialData}
            />

            <SubmitButton onClick={handleSubmit} text='Issue Credential' />
            <ErrorMessage>{formError}</ErrorMessage>
          </fieldset>
        </form>
      </StepLeft>
      <StepRight>
        <Result
          value={credential?.id}
          label='Credential ID'
          disabled={!credential}
          description={credentialIdDescription}
        />
        <JsonResult
          value={JSON.stringify(credential)}
          label='Credential'
          disabled={!credential}
          description={credentialResultDescription}
        />
      </StepRight>
    </Step>
  );
};

export default IssueCredentialStep;
