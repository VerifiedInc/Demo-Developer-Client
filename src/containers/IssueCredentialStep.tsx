import React, {
  ChangeEvent,
  FC,
  MouseEventHandler,
  useState,
  useEffect
} from 'react';

import { useUserState } from '../context/user';
import { issueCredential, useCredential } from '../context/credential';
import { useIssuer, getDefaultIssuer } from '../context/issuer';
import IssueCredentialStep from '../components/IssueCredentialStep';

const IssueCredentialStepContainer: FC = () => {
  const [credentialState, credentialDispatch] = useCredential();
  const [issuerState, issuerDispatch] = useIssuer();
  const userState = useUserState();

  const disabled = !userState.user || !issuerState.issuer;
  const oneYearFromNow = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
  const [expirationDate, setExpirationDate] = useState(oneYearFromNow);
  const [credentialType, setCredentialType] = useState('UsernameCredential');
  const [claims, setClaims] = useState(JSON.stringify({}));

  useEffect(() => {
    const getIssuer = async () => {
      await getDefaultIssuer(issuerDispatch);
    };

    getIssuer();
  }, []);

  useEffect(() => {
    if (userState.user) {
      setClaims(JSON.stringify({ username: userState.user.name }));
    }
  }, [userState]);

  const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setExpirationDate(e.target.value);
  };

  const handleCredentialTypeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCredentialType(e.target.value);
  };

  const handleClaimsChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setClaims(e.target.value);
  };

  const handleSubmit: MouseEventHandler = async (e): Promise<void> => {
    e.preventDefault();

    if (!userState.user) return;
    if (!issuerState.issuer) return;

    const credentialOptions = {
      userUuid: userState.user.uuid,
      issuerUuid: issuerState.issuer.uuid,
      type: credentialType,
      expirationDate: new Date(expirationDate),
      claims: JSON.parse(claims)
    };

    await issueCredential(credentialDispatch, credentialOptions);
  };

  return (
    <IssueCredentialStep
      disabled={disabled}
      issuer={issuerState.issuer}
      expirationDate={expirationDate}
      handleExpirationDateChange={handleExpirationDateChange}
      credentialType={credentialType}
      handleCredentialTypeChange={handleCredentialTypeChange}
      user={userState.user}
      claims={claims}
      handleClaimsChange={handleClaimsChange}
      credential={credentialState.credential}
      handleSubmit={handleSubmit}
    />
  );
};

export default IssueCredentialStepContainer;
