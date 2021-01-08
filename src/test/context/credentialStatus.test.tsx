import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  credentialStatusReducer,
  setCredentialStatus,
  CredentialStatusAction,
  CredentialStatusProvider,
  useCredentialStatus,
  useCredentialStatusState,
  useCredentialStatusDispatch
} from '../../context/credentialStatus';
import { dummyCredentialStatus } from '../mocks';

describe('verifier context', () => {
  describe('credentialStatusReducer', () => {
    it('handles an action with type \'SET_CREDENTIAL_STATUS\'', () => {
      const action: CredentialStatusAction = {
        type: 'SET_CREDENTIAL_STATUS',
        payload: dummyCredentialStatus
      };

      const state = credentialStatusReducer({ credentialStatus: undefined }, action);
      expect(state).toEqual({ credentialStatus: dummyCredentialStatus });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as CredentialStatusAction;
      expect(() => credentialStatusReducer({ credentialStatus: undefined }, action)).toThrow();
    });
  });

  describe('setCredentialStatus', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setCredentialStatus(dispatch, dummyCredentialStatus);
      expect(dispatch).toBeCalledWith({ type: 'SET_CREDENTIAL_STATUS', payload: dummyCredentialStatus });
    });
  });

  describe('CredentialStatusProvider', () => {
    it('renders children', () => {
      render(<CredentialStatusProvider>test</CredentialStatusProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the useCredentialStatus hooks', () => {
      const TestComponent = () => {
        useCredentialStatusState();
        useCredentialStatusDispatch();
        useCredentialStatus();
        return null;
      };
      expect(() => render(<CredentialStatusProvider><TestComponent /></CredentialStatusProvider>)).not.toThrow();
    });
  });

  describe('useCredentialStatus hook', () => {
    it('returns a tuple containing credential state and dispatch', () => {
      const { result } = renderHook(() => useCredentialStatus(), { wrapper: CredentialStatusProvider });
      expect(result.current[0]).toEqual({ credential: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of a CredentialStatusProvider', () => {
      expect(renderHook(() => useCredentialStatus()).result.error.message)
        .toEqual('useCredentialStatus may only be used within a CredentialStatusProvider.');
    });
  });

  describe('useCredentialStatusState hook', () => {
    it('returns the credential state', () => {
      const { result } = renderHook(() => useCredentialStatusState(), { wrapper: CredentialStatusProvider });
      expect(result.current).toEqual({ credential: undefined });
    });

    it('throws if used outside of a CredentialStatusProvider', () => {
      expect(renderHook(() => useCredentialStatusState()).result.error.message)
        .toEqual('CredentialStatusState may only be used within a CredentialStatusProvider.');
    });
  });

  describe('useCredentialStatusDispatch hook', () => {
    it('returns the credentialStatus dispatch', () => {
      const { result } = renderHook(() => useCredentialStatusDispatch(), { wrapper: CredentialStatusProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of a CredentialStatusProvider', () => {
      expect(renderHook(() => useCredentialStatusDispatch()).result.error.message)
        .toEqual('CredentialStatusDispatch may only be used within a CredentialStatusProvider.');
    });
  });
});
