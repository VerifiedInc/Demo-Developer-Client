import React, { FC } from 'react';

import { usePresentationRequestPostResponseState } from '../context/presentationRequestPostResponse';
import DeeplinkStep from '../components/DeeplinkStep';

const DeeplinkStepContainer: FC = () => {
  const { presentationRequestPostResponse } = usePresentationRequestPostResponseState();

  const deeplink = presentationRequestPostResponse?.deeplink;
  const qrCode = presentationRequestPostResponse?.qrCode;
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  return (
    <DeeplinkStep
      deeplink={deeplink}
      qrCodeUrl={qrCode}
      isMobile={isMobile}
    />
  );
};

export default DeeplinkStepContainer;
