import { NoPresentation, Presentation } from '@unumid/types';
import { v4 } from 'uuid';
import {
  User,
  Issuer,
  Verifier,
  Credential,
  HolderApp,
  PresentationRequestPostResponse,
  CredentialStatus
} from '../types';

const now = new Date();

export const dummyUser: User = {
  uuid: v4(),
  name: 'test-username-123',
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

export const dummyPresentationRequestPostResponse: PresentationRequestPostResponse = {
  presentationRequest: {
    uuid: 'e9bba635-8503-40c0-9f65-823fe6df86a5',
    createdAt: new Date('2020-12-18T22:43:53.041Z'),
    updatedAt: new Date('2020-12-18T22:43:53.041Z'),
    expiresAt: new Date('2020-12-18T22:53:53.041Z'),
    verifier: 'did:unum:1426ac33-a3ad-48d4-8bec-74fa17d31d77',
    credentialRequests: [
      {
        type: 'DummyCredential',
        issuers: [
          'did:unum:d620f77a-b454-4294-a6db-47af171897a6'
        ],
        required: false
      }
    ],
    proof: {
      created: '2020-12-18T22:43:53.042Z',
      signatureValue: 'iKx1CJM7nKy656rXFiVjGiRHbqdTNopp5ETvzuCGB9dCSu6U8jEQMxy8w1gPJpmJQ2fSfrdVeSDuoWn89U6MjqsS6UbW39RATD',
      type: 'secp256r1Signature2020',
      verificationMethod: 'did:unum:1426ac33-a3ad-48d4-8bec-74fa17d31d77',
      proofPurpose: 'AssertionMethod'
    },
    metadata: {
      userUuid: dummyUser.uuid
    },
    holderAppUuid: 'a91a5574-e338-46bd-9405-3a72acbd1b6a'
  },
  verifier: {
    name: 'ACME, Inc. Verifier',
    did: 'did:unum:1426ac33-a3ad-48d4-8bec-74fa17d31d77',
    url: 'https://demo-auth-api.dev-unumid.org/presentation'
  },
  issuers: {
    'did:unum:d620f77a-b454-4294-a6db-47af171897a6': {
      name: 'ACME, Inc. Issuer',
      did: 'did:unum:d620f77a-b454-4294-a6db-47af171897a6'
    }
  },
  deeplink: 'https://unumid.org/unumid/presentationRequest/e9bba635-8503-40c0-9f65-823fe6df86a5',
  qrCode: 'data:image/png;base64,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'
};

export const dummyPresentation: Presentation = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1'
  ],
  uuid: v4(),
  type: [
    'VerifiablePresentation'
  ],
  verifiableCredentials: [
    dummyCredential
  ],
  presentationRequestUuid: dummyPresentationRequestPostResponse.presentationRequest.uuid,
  proof: {
    created: '2020-09-03T18:50:52.105Z',
    signatureValue: 'iKx1CJLYue7vopUo2fqGps3TWmxqRxoBDTupumLkaNp2W3UeAjwLUf5WxLRCRkDzEFeKCgT7JdF5fqbpvqnBZoHyYzWYbmW4YQ',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:3ff2f020-50b0-4f4c-a267-a9f104aedcd8#1e126861-a51b-491f-9206-e2c6b8639fd1',
    proofPurpose: 'AssertionMethod'
  }
};

export const dummyNoPresentation: NoPresentation = {
  presentationRequestUuid: '2d4965cb-6505-454b-b652-9eb2e563b27c',
  holder: 'did:unum:5b329cd1-4832-448c-8d7d-08f49e3c6c6d#bab80ad2-08ad-44e7-8549-3d10dd6f7c03',
  type: [
    'NoPresentation',
    'NoPresentation'
  ],
  proof: {
    created: '2020-11-12T20:05:41.917Z',
    signatureValue: 'AN1rKs4bRoNEprfrHAikfjwSsU5dhmgPKj1EpJg9mBYqNubLzU2x6HSK7S44hn7cEc141sMHfGbxhq5qJGcVnLZgUQBh6KM8t',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:5b329cd1-4832-448c-8d7d-08f49e3c6c6d#bab80ad2-08ad-44e7-8549-3d10dd6f7c03',
    proofPurpose: 'assertionMethod'
  }
};

export const dummyCredentialStatus: CredentialStatus = {
  statusCode: 200
};
