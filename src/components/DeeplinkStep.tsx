import React, { FC } from 'react';
import VerifierWidget from '@unumid/web-sdk';

import Step from './Step';
import StepLeft from './StepLeft';
import { PresentationRequestPostResponse } from '../types';
import step4Image from '../assets/step4.png';
import buttonImage from '../assets/verify-with-app@2x.png';

export interface DeeplinkStepProps {
  request?: PresentationRequestPostResponse
  createPresentationRequest: () => Promise<any>
}

const DeeplinkStep: FC<DeeplinkStepProps> = ({
  request = undefined,
  createPresentationRequest
}) => {
  const header = '4. Verifier shares deep link with subject.';
  const description = (
    <>
      In this step, you&apos;ll share the deep link with the subject (user).
      This is to make sure the deep link gets to the user&apos;s device,
      so it can open the correct mobile app.
      Our Verifier SDK presents the easiest option to the user based on the situation.
      For example, on desktop, it shows the deep link as a QR code that the user scans.
    </>
  );

  return (
    <Step header={header} description={description} image={step4Image}>
      <StepLeft>
        <VerifierWidget
          applicationTitle='Unum ID Developer Demo'
          presentationRequest={request}
          createPresentationRequest={createPresentationRequest}
          createInitialPresentationRequest={false}
          deeplinkImgSrc={buttonImage}
        />
      </StepLeft>
    </Step>
  );
};

export default DeeplinkStep;
