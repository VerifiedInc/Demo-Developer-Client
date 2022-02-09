import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';

import { Action, Dispatch } from '../types';
import { NoPresentation } from '@unumid/types';

export type NoPresentationState = { noPresentation: NoPresentation | undefined };
type NoPresentationProviderProps = PropsWithChildren<Record<string, unknown>>;

type NoPresentationActionTypes = 'SET_NOPRESENTATION';
export type NoPresentationAction = Action<NoPresentationActionTypes, NoPresentation>;
export type NoPresentationDispatch = Dispatch<NoPresentationAction>;

const NoPresentationStateContext = createContext<NoPresentationState | undefined>(undefined);
const NoPresentationDispatchContext = createContext<NoPresentationDispatch | undefined>(undefined);

export const noPresentationReducer = (state: NoPresentationState, action: NoPresentationAction): NoPresentationState => {
  switch (action.type) {
    case 'SET_NOPRESENTATION':
      return { ...state, noPresentation: action.payload };
    default:
      throw new Error('Unhandled action type in noPresentationReducer.');
  }
};

export const setNoPresentation = (
  dispatch: NoPresentationDispatch,
  noPresentation: NoPresentation
): void => {
  dispatch({ type: 'SET_NOPRESENTATION', payload: noPresentation });
};

export const NoPresentationProvider: FC<NoPresentationProviderProps> = ({ children = null }) => {
  const [state, dispatch] = useReducer(noPresentationReducer, { noPresentation: undefined });
  return (
    <NoPresentationStateContext.Provider value={state}>
      <NoPresentationDispatchContext.Provider value={dispatch}>
        {children}
      </NoPresentationDispatchContext.Provider>
    </NoPresentationStateContext.Provider>
  );
};

export const useNoPresentationState = (): NoPresentationState => {
  const context = useContext(NoPresentationStateContext);
  if (context === undefined) {
    throw new Error('NoPresentationState may only be used within a NoPresentationProvider.');
  }
  return context;
};

export const useNoPresentationDispatch = (): NoPresentationDispatch => {
  const context = useContext(NoPresentationDispatchContext);
  if (context === undefined) {
    throw new Error('NoPresentationDispatch may only be used within a NoPresentationProvider.');
  }
  return context;
};

export const useNoPresentation = (): [NoPresentationState, NoPresentationDispatch] => {
  try {
    const state = useNoPresentationState();
    const dispatch = useNoPresentationDispatch();
    return [state, dispatch];
  } catch (e) {
    throw new Error('useNoPresentation may only be used within a NoPresentationProvider.');
  }
};
