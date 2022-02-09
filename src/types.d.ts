import { NoPresentation } from '@unumid/types';
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
  createdAt: Date;
  updatedAt: Date;
  name: string;
  did: string;
  url: string;
}

export interface HolderApp {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface CredentialSubject {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Credential {
  '@context': ['https://www.w3.org/2018/credentials/v1', ...string[]];
  credentialStatus: {
    id: string;
    type: string;
  };
  credentialSubject: CredentialSubject;
  issuer: string;
  type: ['VerifiableCredential', ...string[]];
  id: string;
  issuanceDate: Date;
  expirationDate?: Date;
  proof: Proof;
}

export interface CredentialRequest {
  type: string;
  issuers: string[];
  required?: boolean;
}

export interface PresentationRequestOptions {
  verifierUuid: string;
  issuerUuid: string;
  holderAppUuid: string;
  credentialTypes: string[];
  userUuid: string;
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
  metadata: Record<string, unknown>
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

export interface CredentialOptions {
  userUuid: string;
  issuerUuid: string;
  type: string;
  expirationDate: Date;
  claims: Record<string, unknown>;
}

export interface Action<AllowedTypes = string, Payload = unknown> {
  type: AllowedTypes;
  payload?: Payload
}

export type Dispatch<ActionType = Action> = (
  action: ActionType
) => void;

export interface PresentationResponse {
  type: 'VerifiablePresentation';
  isVerified: boolean;
  data: Presentation;
}

export interface NoPresentationResponse {
  type: 'NoPresentation';
  isVerified: boolean;
  data: NoPresentation;
}

export type PresentationOrNoPresentationResponse = PresentationResponse | NoPresentationResponse;

export interface CredentialStatus {
  statusCode: 200
}
