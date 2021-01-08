import React from 'react';
import { render, screen } from '@testing-library/react';

import { Provider } from '../../context';
import { useIssuer } from '../../context/issuer';
import { useVerifier } from '../../context/verifier';
import { useUser } from '../../context/user';
import { useHolderApp } from '../../context/holderApp';
import { usePresentationRequestPostResponse } from '../../context/presentationRequestPostResponse';
import { usePresentation } from '../../context/presentation';
import { useNoPresentation } from '../../context/noPresentation';
import { useCredentialStatus } from '../../context/credentialStatus';

describe('app context', () => {
  describe('Provider', () => {
    it('renders children', () => {
      render(<Provider>test</Provider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to all context hooks', () => {
      const TestComponent = () => {
        useIssuer();
        useVerifier();
        useUser();
        useHolderApp();
        usePresentationRequestPostResponse();
        usePresentation();
        useNoPresentation();
        useCredentialStatus();
        return null;
      };
      expect(() => render(<Provider><TestComponent /></Provider>)).not.toThrow();
    });
  });
});
