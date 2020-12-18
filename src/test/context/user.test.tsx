import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  userReducer,
  setUser,
  UserAction,
  UserDispatch,
  UserProvider,
  useUser,
  useUserState,
  useUserDispatch
} from '../../context/user';
import { dummyUser } from '../mocks';

describe('user context', () => {
  describe('userReducer', () => {
    it('handles an action with type \'SET_USER\'', () => {
      const action: UserAction = {
        type: 'SET_USER',
        payload: dummyUser
      };

      const state = userReducer({ user: undefined }, action);
      expect(state).toEqual({ user: dummyUser });
    });

    it('throws if called with an unrecognized action', () => {
      const action = { type: 'dargle', payload: 'bargle' } as unknown as UserAction;
      expect(() => userReducer({ user: undefined }, action)).toThrow();
    });
  });

  describe('setUser', () => {
    let dispatch: UserDispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('dispatches an action with the correct type and payload', () => {
      setUser(dispatch, dummyUser);
      expect(dispatch).toBeCalledWith({ type: 'SET_USER', payload: dummyUser });
    });
  });

  describe('UserProvider', () => {
    it('renders children', () => {
      render(<UserProvider>test</UserProvider>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('provides access to the useUser hooks', () => {
      const TestComponent = () => {
        useUserState();
        useUserDispatch();
        useUser();
        return null;
      };
      expect(() => render(<UserProvider><TestComponent /></UserProvider>)).not.toThrow();
    });
  });

  describe('useUser hook', () => {
    it('returns a tuple containing user state and dispatch', () => {
      const { result } = renderHook(() => useUser(), { wrapper: UserProvider });
      expect(result.current[0]).toEqual({ user: undefined });
      expect(typeof result.current[1]).toEqual('function');
    });

    it('throws if used outside of a UserProvider', () => {
      expect(renderHook(() => useUser()).result.error.message)
        .toEqual('useUser may only be used within a UserProvider.');
    });
  });

  describe('useUserState hook', () => {
    it('returns the user state', () => {
      const { result } = renderHook(() => useUserState(), { wrapper: UserProvider });
      expect(result.current).toEqual({ user: undefined });
    });

    it('throws if used outside of a UserProvider', () => {
      expect(renderHook(() => useUserState()).result.error.message)
        .toEqual('UserState may only be used within a UserProvider.');
    });
  });

  describe('useUserDispatch hook', () => {
    it('returns the user dispatch function', () => {
      const { result } = renderHook(() => useUserDispatch(), { wrapper: UserProvider });
      expect(typeof result.current).toEqual('function');
    });

    it('throws if used outside of a UserProvider', () => {
      expect(renderHook(() => useUserDispatch()).result.error.message)
        .toEqual('UserDispatch may only be used within a UserProvider.');
    });
  });
});
