import React, {
  FC,
  MouseEventHandler,
  useEffect
} from 'react';

import { useVerifier, getDefaultVerifier } from '../context/verifier';
import { useHolderApp, getDefaultHolderApp } from '../context/holderApp';
import { useIssuerState } from '../context/issuer';
import { useUserState } from '../context/user';
import { usePresentationRequestPostResponse, sendRequest } from '../context/presentationRequestPostResponse';
import { useCredentialState } from '../context/credential';
import RequestStep from '../components/RequestStep';

const RequestStepContainer: FC = () => {
  const [verifierState, verifierDispatch] = useVerifier();
  const [holderAppState, holderAppDispatch] = useHolderApp();
  const issuerState = useIssuerState();
  const userState = useUserState();
  const credentialState = useCredentialState();
  const [requestState, requestDispatch] = usePresentationRequestPostResponse();

  const disabled = !userState.user ||
    !issuerState.issuer ||
    !verifierState.verifier ||
    !holderAppState.holderApp;

  useEffect(() => {
    const getVerifier = async () => {
      await getDefaultVerifier(verifierDispatch);
    };

    const getHolderApp = async () => {
      await getDefaultHolderApp(holderAppDispatch);
    };

    getVerifier();
    getHolderApp();
  }, []);

  const handleSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (disabled) return;

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
    <RequestStep
      disabled={disabled}
      verifierDid={verifierState.verifier?.did}
      holderAppUuid={holderAppState.holderApp?.uuid}
      issuers={issuerState.issuer ? [issuerState.issuer?.did] : []}
      response={requestState.presentationRequestPostResponse}
      handleSubmit={handleSubmit}
      credentialType={credentialState.credential?.type[1]}
    />
  );
};

export default RequestStepContainer;
