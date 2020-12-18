import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  verifierReducer,
  setVerifier,
  VerifierAction,
  VerifierProvider,
  useVerifier,
  useVerifierState,
  useVerifierDispatch
} from '../../context/verifier';
import { dummyVerifier } from '../mocks';

describe('verifier context', () => {
  describe('verifierReducer', () => {
    it('handles an action with type \'SET_VERIFIER\'', () => {
      const action: VerifierAction = {
        type: 'SET_VERIFIER',
        payload: dummyVerifier
      };

      const state = verifierReducer({ verifier: undefined }, action);
      expect(state).toEqual({ verifier: dummyVerifier });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as VerifierAction;
      expect(() => verifierReducer({ verifier: undefined }, action)).toThrow();
    });
  });

  describe('setVerifier', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setVerifier(dispatch, dummyVerifier);
      expect(dispatch).toBeCalledWith({ type: 'SET_VERIFIER', payload: dummyVerifier });
    });
  });

  describe('VerifierProvider', () => {
    it('renders children', () => {
      render(<VerifierProvider>test</VerifierProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the useVerifier hooks', () => {
      const TestComponent = () => {
        useVerifierState();
        useVerifierDispatch();
        useVerifier();
        return null;
      };
      expect(() => render(<VerifierProvider><TestComponent /></VerifierProvider>)).not.toThrow();
    });
  });

  describe('useVerifier hook', () => {
    it('returns a tuple containing verifier state and dispatch', () => {
      const { result } = renderHook(() => useVerifier(), { wrapper: VerifierProvider });
      expect(result.current[0]).toEqual({ verifier: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of a VerifierProvider', () => {
      expect(renderHook(() => useVerifier()).result.error.message)
        .toEqual('useVerifier may only be used within a VerifierProvider.');
    });
  });

  describe('useVerifierState hook', () => {
    it('returns the verifier state', () => {
      const { result } = renderHook(() => useVerifierState(), { wrapper: VerifierProvider });
      expect(result.current).toEqual({ verifier: undefined });
    });

    it('throws if used outside of a VerifierProvider', () => {
      expect(renderHook(() => useVerifierState()).result.error.message)
        .toEqual('VerifierState may only be used within a VerifierProvider.');
    });
  });

  describe('useVerifierDispatch hook', () => {
    it('returns the verifier dispatch', () => {
      const { result } = renderHook(() => useVerifierDispatch(), { wrapper: VerifierProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of a VerifierProvider', () => {
      expect(renderHook(() => useVerifierDispatch()).result.error.message)
        .toEqual('VerifierDispatch may only be used within a VerifierProvider.');
    });
  });
});
