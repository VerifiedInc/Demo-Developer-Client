import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  noPresentationReducer,
  setNoPresentation,
  NoPresentationAction,
  NoPresentationProvider,
  useNoPresentation,
  useNoPresentationState,
  useNoPresentationDispatch
} from '../../context/noPresentation';
import { dummyNoPresentation } from '../mocks';

describe('verifier context', () => {
  describe('noPresentationReducer', () => {
    it('handles an action with type \'SET_NOPRESENTATION\'', () => {
      const action: NoPresentationAction = {
        type: 'SET_NOPRESENTATION',
        payload: dummyNoPresentation
      };

      const state = noPresentationReducer({ noPresentation: undefined }, action);
      expect(state).toEqual({ noPresentation: dummyNoPresentation });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as NoPresentationAction;
      expect(() => noPresentationReducer({ noPresentation: undefined }, action)).toThrow();
    });
  });

  describe('setNoPresentation', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setNoPresentation(dispatch, dummyNoPresentation);
      expect(dispatch).toBeCalledWith({ type: 'SET_NOPRESENTATION', payload: dummyNoPresentation });
    });
  });

  describe('NoPresentationProvider', () => {
    it('renders children', () => {
      render(<NoPresentationProvider>test</NoPresentationProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the useNoPresentation hooks', () => {
      const TestComponent = () => {
        useNoPresentationState();
        useNoPresentationDispatch();
        useNoPresentation();
        return null;
      };
      expect(() => render(<NoPresentationProvider><TestComponent /></NoPresentationProvider>)).not.toThrow();
    });
  });

  describe('useNoPresentation hook', () => {
    it('returns a tuple containing noPresentation state and dispatch', () => {
      const { result } = renderHook(() => useNoPresentation(), { wrapper: NoPresentationProvider });
      expect(result.current[0]).toEqual({ noPresentation: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of a NoPresentationProvider', () => {
      expect(renderHook(() => useNoPresentation()).result.error.message)
        .toEqual('useNoPresentation may only be used within a NoPresentationProvider.');
    });
  });

  describe('useNoPresentationState hook', () => {
    it('returns the noPresentation state', () => {
      const { result } = renderHook(() => useNoPresentationState(), { wrapper: NoPresentationProvider });
      expect(result.current).toEqual({ noPresentation: undefined });
    });

    it('throws if used outside of a NoPresentationProvider', () => {
      expect(renderHook(() => useNoPresentationState()).result.error.message)
        .toEqual('NoPresentationState may only be used within a NoPresentationProvider.');
    });
  });

  describe('useNoPresentationDispatch hook', () => {
    it('returns the noPresentation dispatch', () => {
      const { result } = renderHook(() => useNoPresentationDispatch(), { wrapper: NoPresentationProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of a NoPresentationProvider', () => {
      expect(renderHook(() => useNoPresentationDispatch()).result.error.message)
        .toEqual('NoPresentationDispatch may only be used within a NoPresentationProvider.');
    });
  });
});
