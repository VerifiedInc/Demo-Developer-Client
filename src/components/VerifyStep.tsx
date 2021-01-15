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

  return (
    <Step header={header} description={description}>
      <StepLeft>
        <HardcodedInput
          inputId='verify-verifier-did'
          labelText='Verifier DID'
          value={verifierDid}
        />
        <HardcodedJsonInput
          inputId='presentation'
          labelText='Presentation'
          value={JSON.stringify(presentation)}
        />
      </StepLeft>
      <StepRight>
        <Result
          value={isVerified}
          label='Verified?'
          disabled={!isVerified}
        />
      </StepRight>
    </Step>
  );
};

export default VerifyStep;
