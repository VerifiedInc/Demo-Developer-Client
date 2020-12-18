import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  credentialReducer,
  setCredential,
  CredentialAction,
  CredentialProvider,
  useCredential,
  useCredentialState,
  useCredentialDispatch
} from '../../context/credential';
import { dummyCredential } from '../mocks';

describe('verifier context', () => {
  describe('credentialReducer', () => {
    it('handles an action with type \'SET_CREDENTIAL\'', () => {
      const action: CredentialAction = {
        type: 'SET_CREDENTIAL',
        payload: dummyCredential
      };

      const state = credentialReducer({ credential: undefined }, action);
      expect(state).toEqual({ credential: dummyCredential });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as CredentialAction;
      expect(() => credentialReducer({ credential: undefined }, action)).toThrow();
    });
  });

  describe('setCredential', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setCredential(dispatch, dummyCredential);
      expect(dispatch).toBeCalledWith({ type: 'SET_CREDENTIAL', payload: dummyCredential });
    });
  });

  describe('CredentialProvider', () => {
    it('renders children', () => {
      render(<CredentialProvider>test</CredentialProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the useCredential hooks', () => {
      const TestComponent = () => {
        useCredentialState();
        useCredentialDispatch();
        useCredential();
        return null;
      };
      expect(() => render(<CredentialProvider><TestComponent /></CredentialProvider>)).not.toThrow();
    });
  });

  describe('useCredential hook', () => {
    it('returns a tuple containing credential state and dispatch', () => {
      const { result } = renderHook(() => useCredential(), { wrapper: CredentialProvider });
      expect(result.current[0]).toEqual({ credential: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of a CredentialProvider', () => {
      expect(renderHook(() => useCredential()).result.error.message)
        .toEqual('useCredential may only be used within a CredentialProvider.');
    });
  });

  describe('useCredentialState hook', () => {
    it('returns the credential state', () => {
      const { result } = renderHook(() => useCredentialState(), { wrapper: CredentialProvider });
      expect(result.current).toEqual({ credential: undefined });
    });

    it('throws if used outside of a CredentialProvider', () => {
      expect(renderHook(() => useCredentialState()).result.error.message)
        .toEqual('CredentialState may only be used within a CredentialProvider.');
    });
  });

  describe('useCredentialDispatch hook', () => {
    it('returns the credential dispatch', () => {
      const { result } = renderHook(() => useCredentialDispatch(), { wrapper: CredentialProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of a CredentialProvider', () => {
      expect(renderHook(() => useCredentialDispatch()).result.error.message)
        .toEqual('CredentialDispatch may only be used within a CredentialProvider.');
    });
  });
});
