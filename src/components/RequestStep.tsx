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
  return (
    <Step header='3. Verifier creates request.'>
      <StepLeft>
        <form>
          <fieldset disabled={disabled}>
            <HardcodedInput
              inputId='verifier-did'
              labelText='Verifier DID'
              value={verifierDid}
            />
            <HardcodedInput
              inputId='holder-app-uuid'
              labelText='holderAppUuid'
              value={holderAppUuid}
            />
            <HardcodedInput
              inputId='issuer-dids'
              labelText='Issuers'
              value={issuers.join(', ')}
            />
            <HardcodedInput
              inputId='credential-request-type'
              labelText='Type'
              value={credentialType}
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
          label='deeplink'
          disabled={!response}
        />
        <JsonResult
          value={JSON.stringify(response)}
          label='Request'
          disabled={!response}
        />
      </StepRight>
    </Step>
  );
};

export default RequestStep;
