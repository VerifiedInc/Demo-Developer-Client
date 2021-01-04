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
  return (
    <Step header='4. Verifier shares deep link with subject.'>
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
