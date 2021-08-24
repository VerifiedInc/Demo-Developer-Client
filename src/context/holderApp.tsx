import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';
import { client } from '../feathers';

import { HolderApp, Action, Dispatch } from '../types';

export type HolderAppState = { holderApp: HolderApp | undefined };
type HolderAppProviderProps = PropsWithChildren<Record<string, unknown>>;

type HolderAppActionTypes = 'SET_HOLDERAPP';
export type HolderAppAction = Action<HolderAppActionTypes, HolderApp>;
export type HolderAppDispatch = Dispatch<HolderAppAction>;

const HolderAppStateContext = createContext<HolderAppState | undefined>(undefined);
const HolderAppDispatchContext = createContext<HolderAppDispatch | undefined>(undefined);

export const holderAppReducer = (state: HolderAppState, action: HolderAppAction): HolderAppState => {
  switch (action.type) {
    case 'SET_HOLDERAPP':
      return { ...state, holderApp: action.payload };
    default:
      throw new Error('Unhandled action type in holderAppReducer.');
  }
};

export const setHolderApp = (dispatch: HolderAppDispatch, holderApp: HolderApp): void => {
  dispatch({ type: 'SET_HOLDERAPP', payload: holderApp });
};

export const getDefaultHolderApp = async (dispatch: HolderAppDispatch): Promise<HolderApp> => {
  const holderAppService = client.service('holderApp');
  const holderApp = await holderAppService.get(process.env.REACT_APP_HOLDER_APP_UUID);
  setHolderApp(dispatch, holderApp);
  return holderApp;
};

export const HolderAppProvider: FC<HolderAppProviderProps> = ({ children = null }) => {
  const [state, dispatch] = useReducer(holderAppReducer, { holderApp: undefined });
  return (
    <HolderAppStateContext.Provider value={state}>
      <HolderAppDispatchContext.Provider value={dispatch}>
        {children}
      </HolderAppDispatchContext.Provider>
    </HolderAppStateContext.Provider>
  );
};

export const useHolderAppState = (): HolderAppState => {
  const context = useContext(HolderAppStateContext);
  if (context === undefined) {
    throw new Error('HolderAppState may only be used within a HolderAppProvider.');
  }
  return context;
};

export const useHolderAppDispatch = (): HolderAppDispatch => {
  const context = useContext(HolderAppDispatchContext);
  if (context === undefined) {
    throw new Error('HolderAppDispatch may only be used within a HolderAppProvider.');
  }
  return context;
};

export const useHolderApp = (): [HolderAppState, HolderAppDispatch] => {
  try {
    const state = useHolderAppState();
    const dispatch = useHolderAppDispatch();
    return [state, dispatch];
  } catch (e) {
    throw new Error('useHolderApp may only be used within a HolderAppProvider.');
  }
};
