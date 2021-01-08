import React, { FC, MouseEventHandler } from 'react';

import { useCredentialStatus, revokeCredential } from '../context/credentialStatus';
import { useCredentialState } from '../context/credential';
import { useIssuerState } from '../context/issuer';

import RevokeStep from '../components/RevokeStep';

const RevokeStepContainer: FC = () => {
  const [credentialStatusState, credentialStatusDispatch] = useCredentialStatus();
  const credentialState = useCredentialState();
  const issuerState = useIssuerState();

  const handleSubmit: MouseEventHandler = async (e): Promise<void> => {
    e.preventDefault();

    if (!credentialState.credential) return;
    if (!issuerState.issuer) return;

    await revokeCredential(
      credentialStatusDispatch,
      credentialState.credential.id,
      issuerState.issuer.uuid
    );
  };

  return (
    <RevokeStep
      credentialId={credentialState?.credential?.id}
      handleSubmit={handleSubmit}
      credentialStatus={credentialStatusState?.credentialStatus}
      disabled={!credentialState?.credential}
    />
  );
};

export default RevokeStepContainer;
