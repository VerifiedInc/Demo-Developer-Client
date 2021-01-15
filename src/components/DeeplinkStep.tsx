import React, { FC } from 'react';

import Step from './Step';
import StepLeft from './StepLeft';
import DeeplinkButton from './DeeplinkButton';
import QrCode from './QrCode';

export interface DeeplinkStepProps {
  deeplink?: string;
  qrCodeUrl?: string;
  isMobile: boolean;
}

const DeeplinkStep: FC<DeeplinkStepProps> = ({
  deeplink = '',
  qrCodeUrl = '',
  isMobile = false
}) => {
  const header = '4. Verifier shares deep link with subject.';
  const description = (
    <>
      In this step, you&apos;ll share the deep link with the subject (user).
      This is to make sure the deep link gets to the user&apos;s device,
      so it can open the correct mobile app.
      Our Verifier SDK presentat the easiest option to the user based on the situation.
      For example, on desktop, it shows the deep link as a QR code that tue user scans.
    </>
  );

  return (
    <Step header={header} description={description}>
      <StepLeft>
        {
          isMobile
            ? <DeeplinkButton deeplink={deeplink} />
            : <QrCode qrCodeUrl={qrCodeUrl} />
        }
      </StepLeft>
    </Step>
  );
};

export default DeeplinkStep;
