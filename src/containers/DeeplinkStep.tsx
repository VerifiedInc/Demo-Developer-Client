import React, { FC } from 'react';

import { usePresentationRequestPostResponse, sendRequest } from '../context/presentationRequestPostResponse';
import { useVerifierState } from '../context/verifier';
import { useIssuerState } from '../context/issuer';
import { useHolderAppState } from '../context/holderApp';
import { useCredentialState } from '../context/credential';
import { useUserState } from '../context/user';

import DeeplinkStep from '../components/DeeplinkStep';

const DeeplinkStepContainer: FC = () => {
  const [{ presentationRequestPostResponse }, requestDispatch] = usePresentationRequestPostResponse();
  const verifierState = useVerifierState();
  const issuerState = useIssuerState();
  const holderAppState = useHolderAppState();
  const credentialState = useCredentialState();
  const userState = useUserState();

  const createPresentationRequest = async () => {
    console.log('createPresentationRequest');
    if (!userState?.user?.uuid) return;

    const options = {
      verifierUuid: verifierState.verifier?.uuid as string,
      issuerUuid: issuerState.issuer?.uuid as string,
      holderAppUuid: holderAppState.holderApp?.uuid as string,
      credentialTypes: [credentialState.credential?.type[1] as string],
      userUuid: userState?.user?.uuid
    };

    await sendRequest(requestDispatch, options);
  };

  return (
    <DeeplinkStep
      request={presentationRequestPostResponse}
      createPresentationRequest={createPresentationRequest}
    />
  );
};

export default DeeplinkStepContainer;
