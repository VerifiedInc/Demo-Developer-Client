import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  presentationRequestPostResponseReducer,
  setPresentationRequestPostResponse,
  PresentationRequestPostResponseAction,
  PresentationRequestPostResponseProvider,
  usePresentationRequestPostResponse,
  usePresentationRequestPostResponseState,
  usePresentationRequestPostResponseDispatch
} from '../../context/presentationRequestPostResponse';
import { dummyPresentationRequestPostResponse } from '../mocks';

describe('verifier context', () => {
  describe('presentationRequestPostResponseReducer', () => {
    it('handles an action with type \'SET_PRESENTATIONREQUESTPOSTRESPONSE\'', () => {
      const action: PresentationRequestPostResponseAction = {
        type: 'SET_PRESENTATIONREQUESTPOSTRESPONSE',
        payload: dummyPresentationRequestPostResponse
      };

      const state = presentationRequestPostResponseReducer({ presentationRequestPostResponse: undefined }, action);
      expect(state).toEqual({ presentationRequestPostResponse: dummyPresentationRequestPostResponse });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as PresentationRequestPostResponseAction;
      expect(() => presentationRequestPostResponseReducer({ presentationRequestPostResponse: undefined }, action)).toThrow();
    });
  });

  describe('setPresentationRequestPostResponse', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setPresentationRequestPostResponse(dispatch, dummyPresentationRequestPostResponse);
      expect(dispatch).toBeCalledWith({ type: 'SET_PRESENTATIONREQUESTPOSTRESPONSE', payload: dummyPresentationRequestPostResponse });
    });
  });

  describe('PresentationRequestPostResponseProvider', () => {
    it('renders children', () => {
      render(<PresentationRequestPostResponseProvider>test</PresentationRequestPostResponseProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the usePresentationRequestPostResponse hooks', () => {
      const TestComponent = () => {
        usePresentationRequestPostResponseState();
        usePresentationRequestPostResponseDispatch();
        usePresentationRequestPostResponse();
        return null;
      };
      expect(() => render(<PresentationRequestPostResponseProvider><TestComponent /></PresentationRequestPostResponseProvider>)).not.toThrow();
    });
  });

  describe('usePresentationRequestPostResponse hook', () => {
    it('returns a tuple containing presentationRequestPostResponse state and dispatch', () => {
      const { result } = renderHook(() => usePresentationRequestPostResponse(), { wrapper: PresentationRequestPostResponseProvider });
      expect(result.current[0]).toEqual({ presentationRequestPostResponse: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of a PresentationRequestPostResponseProvider', () => {
      expect(renderHook(() => usePresentationRequestPostResponse()).result.error.message)
        .toEqual('usePresentationRequestPostResponse may only be used within a PresentationRequestPostResponseProvider.');
    });
  });

  describe('usePresentationRequestPostResponseState hook', () => {
    it('returns the presentationRequestPostResponse state', () => {
      const { result } = renderHook(() => usePresentationRequestPostResponseState(), { wrapper: PresentationRequestPostResponseProvider });
      expect(result.current).toEqual({ presentationRequestPostResponse: undefined });
    });

    it('throws if used outside of a PresentationRequestPostResponseProvider', () => {
      expect(renderHook(() => usePresentationRequestPostResponseState()).result.error.message)
        .toEqual('PresentationRequestPostResponseState may only be used within a PresentationRequestPostResponseProvider.');
    });
  });

  describe('usePresentationRequestPostResponseDispatch hook', () => {
    it('returns the presentationRequestPostResponse dispatch', () => {
      const { result } = renderHook(() => usePresentationRequestPostResponseDispatch(), { wrapper: PresentationRequestPostResponseProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of a PresentationRequestPostResponseProvider', () => {
      expect(renderHook(() => usePresentationRequestPostResponseDispatch()).result.error.message)
        .toEqual('PresentationRequestPostResponseDispatch may only be used within a PresentationRequestPostResponseProvider.');
    });
  });
});
