import { v4 } from 'uuid';
import {
  User,
  Issuer,
  Verifier,
  Credential,
  HolderApp
} from '../types';

const now = new Date();

export const dummyUser: User = {
  uuid: v4(),
  name: 'Testy McTesterson',
  did: `did:unum:${v4()}`,
  createdAt: now,
  updatedAt: now,
  companyUuid: v4()
};

export const dummyIssuer: Issuer = {
  uuid: v4(),
  did: `did:unum:${v4()}`,
  createdAt: now,
  updatedAt: now,
  name: 'Dummy Issuer'
};

export const dummyVerifier: Verifier = {
  uuid: v4(),
  did: `did:unum:${v4()}`,
  createdAt: now,
  updatedAt: now,
  name: 'Dummy Verifier',
  url: 'https://demo-developer-api.unumid.org/presentation'
};

export const dummyCredential: Credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1'
  ],
  credentialStatus: {
    id: 'https://api.dev-unumid.org//credentialStatus/de7427da-25ac-4c1a-bdba-019a63edd766',
    type: 'CredentialStatus'
  },
  credentialSubject: {
    id: 'did:unum:a0cd2e20-5f3e-423c-8382-afc722eaca9e',
    value: 'dummy value'
  },
  issuer: 'did:unum:d620f77a-b454-4294-a6db-47af171897a6',
  type: [
    'VerifiableCredential',
    'DummyCredential'
  ],
  id: 'de7427da-25ac-4c1a-bdba-019a63edd766',
  issuanceDate: new Date('2020-12-18T18:52:06.392Z'),
  expirationDate: new Date('2020-10-26T23:07:12.770Z'),
  proof: {
    created: '2020-12-18T18:52:06.399Z',
    signatureValue: 'AN1rKvtGiYpz9WEiLTUQE8VoSvVNErsMCpvwuTwu1LUA4k9qZVxZerqTiaXMcaJdsa4u7yzpETmVwUyANc2ha37qPjAszpAox',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:d620f77a-b454-4294-a6db-47af171897a6',
    proofPurpose: 'AssertionMethod'
  }
};

export const dummyHolderApp: HolderApp = {
  uuid: v4(),
  name: 'Demo Holder App',
  createdAt: now,
  updatedAt: now,
  uriScheme: 'unumid://'
};
