import React, { FC } from 'react';

import Step from './Step';
import StepLeft from './StepLeft';
import StepRight from './StepRight';
import HardcodedInput from './HardcodedInput';
import HardcodedJsonInput from './HardcodedJsonInput';
import Result from './Result';
import { Presentation } from '../types';

export interface VerifyStepProps {
  verifierDid?: string;
  presentation?: Presentation;
  isVerified?: string;
}

const VerifyStep: FC<VerifyStepProps> = ({
  verifierDid = '',
  presentation = undefined,
  isVerified = undefined
}) => {
  const header = '6. Verifier verifies presentation.';
  const description = (
    <>
      In this step, you&apos;ll act as the verifier again.
      If you chose to share data in step 5,
      you&apos;ll see that data in the presentation autofilled below.
      (A presentation is just a collection of one or more credentials.)
      When you pass the presentation to the Server SDK (done automatically for this demo),
      the SDK verifies whether it&apos;s valid.
    </>
  );

  const verifierDidDescription = (
    <>
      Identifies the verifier in Unum ID.
      You receive one when you register a verifier using our Server SDK.
    </>
  );

  const presentationDescription = (
    <>
      Collection of (one or more) credentials you (as the subject) shared in step 5.
    </>
  );

  const verifiedDescripiton = (
    <>
      Whether this is a valid presentation.
      It can be invalid for a number of reasons,
      e.g. if the cryptographic signature is malformed,
      one or more of the contained credentials has been revoked,
      the data has been corrupted or altered, etc.
    </>
  );

  return (
    <Step header={header} description={description}>
      <StepLeft>
        <HardcodedInput
          inputId='verify-verifier-did'
          labelText='Verifier DID'
          value={verifierDid}
          description={verifierDidDescription}
        />
        <HardcodedJsonInput
          inputId='presentation'
          labelText='Presentation'
          value={JSON.stringify(presentation)}
          description={presentationDescription}
        />
      </StepLeft>
      <StepRight>
        <Result
          value={isVerified}
          label='Verified?'
          disabled={!isVerified}
          description={verifiedDescripiton}
        />
      </StepRight>
    </Step>
  );
};

export default VerifyStep;
