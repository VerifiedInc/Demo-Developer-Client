import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  presentationReducer,
  setPresentation,
  PresentationAction,
  PresentationProvider,
  usePresentation,
  usePresentationState,
  usePresentationDispatch,
  setIsVerified
} from '../../context/presentation';
import { dummyPresentation } from '../mocks';

describe('verifier context', () => {
  describe('presentationReducer', () => {
    it('handles an action with type \'SET_PRESENTATION\'', () => {
      const action: PresentationAction = {
        type: 'SET_PRESENTATION',
        payload: dummyPresentation
      };

      const state = presentationReducer(
        { presentation: undefined, isVerified: undefined },
        action
      );
      expect(state).toEqual({ presentation: dummyPresentation });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as PresentationAction;
      expect(() => presentationReducer(
        { presentation: undefined, isVerified: undefined },
        action
      )).toThrow();
    });
  });

  describe('setPresentation', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setPresentation(dispatch, dummyPresentation);
      expect(dispatch).toBeCalledWith({ type: 'SET_PRESENTATION', payload: dummyPresentation });
    });
  });

  describe('setIsVerified', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setIsVerified(dispatch, true);
      expect(dispatch).toBeCalledWith({ type: 'SET_IS_VERIFIED', payload: true });
    });
  });

  describe('PresentationProvider', () => {
    it('renders children', () => {
      render(<PresentationProvider>test</PresentationProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the usePresentation hooks', () => {
      const TestComponent = () => {
        usePresentationState();
        usePresentationDispatch();
        usePresentation();
        return null;
      };
      expect(() => render(<PresentationProvider><TestComponent /></PresentationProvider>)).not.toThrow();
    });
  });

  describe('usePresentation hook', () => {
    it('returns a tuple containing presentation state and dispatch', () => {
      const { result } = renderHook(() => usePresentation(), { wrapper: PresentationProvider });
      expect(result.current[0]).toEqual({ presentation: undefined, isVerified: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of a PresentationProvider', () => {
      expect(renderHook(() => usePresentation()).result.error.message)
        .toEqual('usePresentation may only be used within a PresentationProvider.');
    });
  });

  describe('usePresentationState hook', () => {
    it('returns the presentation state', () => {
      const { result } = renderHook(() => usePresentationState(), { wrapper: PresentationProvider });
      expect(result.current).toEqual({ presentation: undefined, isVerified: undefined });
    });

    it('throws if used outside of a PresentationProvider', () => {
      expect(renderHook(() => usePresentationState()).result.error.message)
        .toEqual('PresentationState may only be used within a PresentationProvider.');
    });
  });

  describe('usePresentationDispatch hook', () => {
    it('returns the presentation dispatch', () => {
      const { result } = renderHook(() => usePresentationDispatch(), { wrapper: PresentationProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of a PresentationProvider', () => {
      expect(renderHook(() => usePresentationDispatch()).result.error.message)
        .toEqual('PresentationDispatch may only be used within a PresentationProvider.');
    });
  });
});
