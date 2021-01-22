import React, {
  FC,
  MouseEventHandler
} from 'react';

import Step from './Step';
import StepLeft from './StepLeft';
import StepRight from './StepRight';
import HardcodedInput from './HardcodedInput';
import SubmitButton from './SubmitButton';
import Result from './Result';
import JsonResult from './JsonResult';
import { noop } from '../utils/noop';
import { PresentationRequestPostResponse } from '../types';
import Bold from './Bold';

export interface RequestStepProps {
  disabled: boolean;
  verifierDid?: string;
  holderAppUuid?: string;
  issuers: string[];
  credentialType?: string;
  handleSubmit: MouseEventHandler;
  response?: PresentationRequestPostResponse;
}

const RequestStep: FC<RequestStepProps> = ({
  disabled = true,
  verifierDid = '',
  holderAppUuid = '',
  issuers = [],
  credentialType = '',
  handleSubmit = noop,
  response = undefined
}) => {
  const header = '3. Verifier creates request.';
  const description = (
    <>
      In this step, you&apos;ll act as a <Bold>verifier</Bold> (Hooli FinTech) to request identity data from a user.
      This request prompts the user to share a credential from an Unum ID powered mobile app.
      You could use this credential, for example, to instantly create a Hooli account for the user
      rather than making them go through a long manual process.
    </>
  );

  const verifierDidDescription = <>Identifies the verifier in Unum ID. You receive one when you register a verifier using our Server SDK.</>;

  const holderAppUuidDescription = (
    <>
      Identifies the mobile app storing the user&apos;s data.
      The user is storing ("holding") credentials in a mobile app powered by Unum ID
      &mdash; one with our Mobile SDK embedded in it.
    </>
  );

  const issuersDescription = (
    <>
      DIDs (decentralized identifiers) identifying one or more companies you&apos;re willing to accept credentials from.
      In this example, you&apos;re only willing to accept a credential from the issuer in step 2 above (ACME Bank).
    </>
  );

  const typeDescription = (
    <>
      Type of credential you&apos;re requesting. This could be contact information, KYC data, a government ID, etc.
      In this example, you&apos;re requesting the type of credential you created in step 2.
    </>
  );

  const deeplinkDescription = <>Link that opens the correct mobile app for the user. You&apos;ll share this with the user in step 4.</>;

  const requestDescription = (
    <>
      JSON serialization of the full request object our Server SDK creates for you.
      We store this temporarily, until the user&apos;s app retrieves it.
    </>
  );

  return (
    <Step header={header} description={description}>
      <StepLeft>
        <form>
          <fieldset disabled={disabled}>
            <HardcodedInput
              inputId='verifier-did'
              labelText='Verifier DID'
              value={verifierDid}
              description={verifierDidDescription}
            />
            <HardcodedInput
              inputId='holder-app-uuid'
              labelText='Holder App UUID'
              value={holderAppUuid}
              description={holderAppUuidDescription}
            />
            <HardcodedInput
              inputId='issuer-dids'
              labelText='Issuers'
              value={issuers.join(', ')}
              description={issuersDescription}
            />
            <HardcodedInput
              inputId='credential-request-type'
              labelText='Type'
              value={credentialType}
              description={typeDescription}
            />
            <SubmitButton
              onClick={handleSubmit}
              text='Send Request'
            />
          </fieldset>
        </form>
      </StepLeft>
      <StepRight>
        <Result
          value={response?.deeplink}
          label='Deep Link'
          disabled={!response}
          description={deeplinkDescription}
        />
        <JsonResult
          value={JSON.stringify(response)}
          label='Request'
          disabled={!response}
          description={requestDescription}
        />
      </StepRight>
    </Step>
  );
};

export default RequestStep;
