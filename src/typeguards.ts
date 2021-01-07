import {
  PresentationOrNoPresentationResponse,
  PresentationResponse,
  NoPresentationResponse
} from './types';

export const isPresentationResponse = (
  maybePresentationResponse: PresentationOrNoPresentationResponse
): maybePresentationResponse is PresentationResponse => {
  return maybePresentationResponse.type === 'VerifiablePresentation';
};

export const isNoPresentationResponse = (
  maybeNoPresentationResponse: PresentationOrNoPresentationResponse
): maybeNoPresentationResponse is NoPresentationResponse => {
  return maybeNoPresentationResponse.type === 'NoPresentation';
};
