import React, { FC } from 'react';

import { usePresentationState } from '../context/presentation';
import { useVerifierState } from '../context/verifier';
import VerifyStep from '../components/VerifyStep';

const VerifyStepContainer: FC = () => {
  const presentationState = usePresentationState();

  const verifierState = useVerifierState();
  const isVerified = typeof presentationState?.isVerified === 'undefined'
    ? undefined
    : presentationState?.isVerified.toString();
  return (
    <VerifyStep
      verifierDid={verifierState?.verifier?.did}
      presentation={presentationState?.presentation}
      isVerified={isVerified}
    />
  );
};

export default VerifyStepContainer;
