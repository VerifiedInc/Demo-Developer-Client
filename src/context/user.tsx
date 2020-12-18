import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';

import { User, Action, Dispatch } from '../types';

export type UserState = { user: User | undefined };
type UserProviderProps = PropsWithChildren<{}>;

type UserActionTypes = 'SET_USER';
export type UserAction = Action<UserActionTypes, User>;
export type UserDispatch = Dispatch<UserAction>;

const UserStateContext = createContext<UserState | undefined>(undefined);
const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      throw new Error('Unhandled action type in userReducer');
  }
};

export const setUser = (dispatch: UserDispatch, user: User): void => {
  dispatch({ type: 'SET_USER', payload: user });
};

export const UserProvider: FC<UserProviderProps> = ({ children = null }) => {
  const [state, dispatch] = useReducer(userReducer, { user: undefined });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = (): UserState => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('UserState may only be used within a UserProvider.');
  }

  return context;
};

export const useUserDispatch = (): UserDispatch => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('UserDispatch may only be used within a UserProvider.');
  }

  return context;
};

export const useUser = (): [UserState, UserDispatch] => {
  try {
    const state = useUserState();
    const dispatch = useUserDispatch();
    return [state, dispatch];
  } catch (e) {
    throw new Error('useUser may only be used within a UserProvider.');
  }
};
