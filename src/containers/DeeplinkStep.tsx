import React, { FC } from 'react';

import { usePresentationRequestPostResponseState } from '../context/presentationRequestPostResponse';
import DeeplinkStep from '../components/DeeplinkStep';

const DeeplinkStepContainer: FC = () => {
  const { presentationRequestPostResponse } = usePresentationRequestPostResponseState();

  return (
    <DeeplinkStep
      request={presentationRequestPostResponse}
    />
  );
};

export default DeeplinkStepContainer;
