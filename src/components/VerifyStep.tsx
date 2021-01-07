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
  return (
    <Step header='6. Verifier verifies presentation'>
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
