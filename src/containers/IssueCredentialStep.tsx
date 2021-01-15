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
  const [credentialType, setCredentialType] = useState('BankIdentityCredential');
  const [claims, setClaims] = useState('');

  useEffect(() => {
    const getIssuer = async () => {
      await getDefaultIssuer(issuerDispatch);
    };

    getIssuer();
  }, []);

  useEffect(() => {
    if (userState.user) {
      const demoClaims = {
        firstName: 'Wile',
        middleInitial: 'E.',
        lastName: 'Coyote',
        username: userState.user.name,
        ssn4: 4321,
        contactInformation: {
          emailAddress: 'AnvilAvoider@gmail.com',
          phoneNumber: '1234567890',
          homeAddress: {
            line1: '98765 Runner Rd.',
            city: 'Desert',
            state: 'AZ',
            zip: 12345,
            country: 'United States'
          }
        },
        driversLicense: {
          state: 'AZ',
          number: 'n-123456789',
          expiration: '2026-01-14T00:00:00.000Z'
        },
        accounts: {
          checking: {
            accountNumber: '543888430912',
            routingNumber: '021000021'
          }
        },
        confidence: '99%'
      };
      setClaims(JSON.stringify(demoClaims));
    } else {
      setClaims('');
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
