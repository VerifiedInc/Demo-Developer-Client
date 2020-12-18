import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  issuerReducer,
  setIssuer,
  IssuerAction,
  IssuerProvider,
  useIssuerState,
  useIssuerDispatch,
  useIssuer
} from '../../context/issuer';
import { dummyIssuer } from '../mocks';

describe('issuer context', () => {
  describe('issuerReducer', () => {
    it('handles an action with type \'SET_ISSUER\'', () => {
      const action: IssuerAction = {
        type: 'SET_ISSUER',
        payload: dummyIssuer
      };

      const state = issuerReducer({ issuer: undefined }, action);
      expect(state).toEqual({ issuer: dummyIssuer });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as IssuerAction;
      expect(() => issuerReducer({ issuer: undefined }, action)).toThrow();
    });
  });

  describe('setIssuer', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setIssuer(dispatch, dummyIssuer);
      expect(dispatch).toBeCalledWith({ type: 'SET_ISSUER', payload: dummyIssuer });
    });
  });

  describe('IssuerProvider', () => {
    it('renders children', () => {
      render(<IssuerProvider>test</IssuerProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the useIssuer hooks', () => {
      const TestComponent = () => {
        useIssuerState();
        useIssuerDispatch();
        useIssuer();
        return null;
      };
      expect(() => render(<IssuerProvider><TestComponent /></IssuerProvider>)).not.toThrow();
    });
  });

  describe('useIssuer hook', () => {
    it('returns a tuple containing issuer state and dispatch', () => {
      const { result } = renderHook(() => useIssuer(), { wrapper: IssuerProvider });
      expect(result.current[0]).toEqual({ issuer: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of an IssuerProvider', () => {
      expect(renderHook(() => useIssuer()).result.error.message)
        .toEqual('useIssuer may only be used within an IssuerProvider.');
    });
  });

  describe('useIssuerState hook', () => {
    it('returns the issuer state', () => {
      const { result } = renderHook(() => useIssuerState(), { wrapper: IssuerProvider });
      expect(result.current).toEqual({ issuer: undefined });
    });

    it('throws if used outside of an IssuerProvider', () => {
      expect(renderHook(() => useIssuerState()).result.error.message)
        .toEqual('IssuerState may only be used within an IssuerProvider.');
    });
  });

  describe('useIssuerDispatch hook', () => {
    it('returns the issuer dispatch', () => {
      const { result } = renderHook(() => useIssuerDispatch, { wrapper: IssuerProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of an IssuerProvider', () => {
      expect(renderHook(() => useIssuerDispatch()).result.error.message)
        .toEqual('IssuerDispatch may only be used within an IssuerProvider.');
    });
  });
});
