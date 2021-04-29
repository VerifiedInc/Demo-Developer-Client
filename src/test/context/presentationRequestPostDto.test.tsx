import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  presentationRequestPostDtoReducer,
  setPresentationRequestPostDto,
  PresentationRequestPostDtoAction,
  PresentationRequestPostDtoProvider,
  usePresentationRequestPostDto,
  usePresentationRequestPostDtoState,
  usePresentationRequestPostDtoDispatch
} from '../../context/presentationRequestPostDto';
import { dummyPresentationRequestPostDto } from '../mocks';

describe('PresentationRequestPostDto context', () => {
  describe('presentationRequestPostDtoReducer', () => {
    it('handles an action with type \'SET_PRESENTATIONREQUESTPOSTRESPONSE\'', () => {
      const action: PresentationRequestPostDtoAction = {
        type: 'SET_PRESENTATIONREQUESTPOSTDTO',
        payload: dummyPresentationRequestPostDto
      };

      const state = presentationRequestPostDtoReducer({ presentationRequestPostDto: undefined }, action);
      expect(state).toEqual({ presentationRequestPostDto: dummyPresentationRequestPostDto });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as PresentationRequestPostDtoAction;
      expect(() => presentationRequestPostDtoReducer({ presentationRequestPostDto: undefined }, action)).toThrow();
    });
  });

  describe('setPresentationRequestPostDto', () => {
    it('dispatches an action with the correct type and payload', () => {
      const dispatch = jest.fn();
      setPresentationRequestPostDto(dispatch, dummyPresentationRequestPostDto);
      expect(dispatch).toBeCalledWith({ type: 'SET_PRESENTATIONREQUESTPOSTDTO', payload: dummyPresentationRequestPostDto });
    });
  });

  describe('PresentationRequestPostDtoProvider', () => {
    it('renders children', () => {
      render(<PresentationRequestPostDtoProvider>test</PresentationRequestPostDtoProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the usePresentationRequestPostDto hooks', () => {
      const TestComponent = () => {
        usePresentationRequestPostDtoState();
        usePresentationRequestPostDtoDispatch();
        usePresentationRequestPostDto();
        return null;
      };
      expect(() => render(<PresentationRequestPostDtoProvider><TestComponent /></PresentationRequestPostDtoProvider>)).not.toThrow();
    });
  });

  describe('usePresentationRequestPostDto hook', () => {
    it('returns a tuple containing presentationRequestPostDto state and dispatch', () => {
      const { result } = renderHook(() => usePresentationRequestPostDto(), { wrapper: PresentationRequestPostDtoProvider });
      expect(result.current[0]).toEqual({ presentationRequestPostDto: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of a PresentationRequestPostDtoProvider', () => {
      expect(renderHook(() => usePresentationRequestPostDto()).result.error.message)
        .toEqual('usePresentationRequestPostDto may only be used within a PresentationRequestPostDtoProvider.');
    });
  });

  describe('usePresentationRequestPostDtoState hook', () => {
    it('returns the presentationRequestPostDto state', () => {
      const { result } = renderHook(() => usePresentationRequestPostDtoState(), { wrapper: PresentationRequestPostDtoProvider });
      expect(result.current).toEqual({ presentationRequestPostDto: undefined });
    });

    it('throws if used outside of a PresentationRequestPostDtoProvider', () => {
      expect(renderHook(() => usePresentationRequestPostDtoState()).result.error.message)
        .toEqual('PresentationRequestPostDtoState may only be used within a PresentationRequestPostDtoProvider.');
    });
  });

  describe('usePresentationRequestPostDtoDispatch hook', () => {
    it('returns the presentationRequestPostDto dispatch', () => {
      const { result } = renderHook(() => usePresentationRequestPostDtoDispatch(), { wrapper: PresentationRequestPostDtoProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of a PresentationRequestPostDtoProvider', () => {
      expect(renderHook(() => usePresentationRequestPostDtoDispatch()).result.error.message)
        .toEqual('PresentationRequestPostDtoDispatch may only be used within a PresentationRequestPostDtoProvider.');
    });
  });
});
