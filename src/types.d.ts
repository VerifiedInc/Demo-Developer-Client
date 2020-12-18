export interface User {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  did: string;
  companyUuid: string;
}

export interface Issuer {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  did: string;
}

export interface Verifier {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  did: string;
  url: string;
}

export interface HolderApp {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  uriScheme: string;
}

export interface Proof {
  created: string;
  signatureValue: string;
  type: string;
  verificationMethod: string;
  proofPurpose: string;
}

export interface CredentialRequest {
  type: string;
  issuers: string[];
  required?: boolean;
}

export interface PresentationRequest {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  verifier: string;
  holderAppUuid: string;
  credentialRequests: CredentialRequest[];
  proof: Proof;
  metadata: {}
}

export interface VerifierInfo {
  name: string;
  did: string;
  url: string;
}

export interface IssuerInfo {
  name: string;
  did: string;
}

export interface PresentationRequestPostResponse {
  presentationRequest: PresentationRequest;
  verifier: VerifierInfo;
  issuers: {
    [did: string]: IssuerInfo
  };
  deeplink: string;
  qrCode: string;
}

export interface Presentation {
  '@context': ['https://www.w3.org/2018/credentials/v1', ...string[]];
  uuid: string;
  type: ['VerifiablePresentation', ...string[]];
  verifiableCredential: Credential[];
  proof: Proof;
  presentationRequestUuid: string;
}

export interface NoPresentation {
  presentationRequestUuid: string;
  holder: string;
  proof: Proof;
  type: ['NoPresentation', ('Declination' | 'Report' | 'NoPresentation')?];
}

export interface Action<AllowedTypes = string, Payload = any> {
  type: AllowedTypes;
  payload?: Payload
}

export type Dispatch<ActionType = Action> = (
  action: ActionType
) => void;
