import React, { FC } from 'react';
import UnumIDWidget from '@unumid/web-sdk-react';
import { PresentationRequestPostDto } from '@unumid/types';

import Step from './Step';
import StepLeft from './StepLeft';
import step4Image from '../assets/step4.png';

export interface DeeplinkStepProps {
  request?: PresentationRequestPostDto
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
        <UnumIDWidget
          env={process.env.NODE_ENV === 'development' ? 'development' : 'sandbox'}
          apiKey={process.env.REACT_APP_API_KEY as string}
          presentationRequest={request}
          createPresentationRequest={createPresentationRequest}
          createInitialPresentationRequest={false}
        />
      </StepLeft>
    </Step>
  );
};

export default DeeplinkStep;
