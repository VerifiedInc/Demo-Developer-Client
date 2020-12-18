import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  holderAppReducer,
  setHolderApp,
  HolderAppAction,
  HolderAppProvider,
  useHolderApp,
  useHolderAppState,
  useHolderAppDispatch
} from '../../context/holderApp';
import { dummyHolderApp } from '../mocks';

describe('verifier context', () => {
  describe('holderAppReducer', () => {
    it('handles an action with type \'SET_HOLDERAPP\'', () => {
      const action: HolderAppAction = {
        type: 'SET_HOLDERAPP',
        payload: dummyHolderApp
      };

      const state = holderAppReducer({ holderApp: undefined }, action);
      expect(state).toEqual({ holderApp: dummyHolderApp });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as HolderAppAction;
      expect(() => holderAppReducer({ holderApp: undefined }, action)).toThrow();
    });
  });

  describe('setHolderApp', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setHolderApp(dispatch, dummyHolderApp);
      expect(dispatch).toBeCalledWith({ type: 'SET_HOLDERAPP', payload: dummyHolderApp });
    });
  });

  describe('HolderAppProvider', () => {
    it('renders children', () => {
      render(<HolderAppProvider>test</HolderAppProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the useHolderApp hooks', () => {
      const TestComponent = () => {
        useHolderAppState();
        useHolderAppDispatch();
        useHolderApp();
        return null;
      };
      expect(() => render(<HolderAppProvider><TestComponent /></HolderAppProvider>)).not.toThrow();
    });
  });

  describe('useHolderApp hook', () => {
    it('returns a tuple containing holderApp state and dispatch', () => {
      const { result } = renderHook(() => useHolderApp(), { wrapper: HolderAppProvider });
      expect(result.current[0]).toEqual({ holderApp: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of a HolderAppProvider', () => {
      expect(renderHook(() => useHolderApp()).result.error.message)
        .toEqual('useHolderApp may only be used within a HolderAppProvider.');
    });
  });

  describe('useHolderAppState hook', () => {
    it('returns the holderApp state', () => {
      const { result } = renderHook(() => useHolderAppState(), { wrapper: HolderAppProvider });
      expect(result.current).toEqual({ holderApp: undefined });
    });

    it('throws if used outside of a HolderAppProvider', () => {
      expect(renderHook(() => useHolderAppState()).result.error.message)
        .toEqual('HolderAppState may only be used within a HolderAppProvider.');
    });
  });

  describe('useHolderAppDispatch hook', () => {
    it('returns the holderApp dispatch', () => {
      const { result } = renderHook(() => useHolderAppDispatch(), { wrapper: HolderAppProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of a HolderAppProvider', () => {
      expect(renderHook(() => useHolderAppDispatch()).result.error.message)
        .toEqual('HolderAppDispatch may only be used within a HolderAppProvider.');
    });
  });
});
