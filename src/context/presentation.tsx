import { Presentation } from '@unumid/types';
import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';

import { Action, Dispatch } from '../types';

export type PresentationState = { presentation: Presentation | undefined, isVerified: boolean | undefined };
type PresentationProviderProps = PropsWithChildren<Record<string, unknown>>;

type SetPresentationAction = Action<'SET_PRESENTATION', Presentation | undefined>
type SetIsValidAction = Action<'SET_IS_VERIFIED', boolean | undefined>
export type PresentationAction = SetPresentationAction | SetIsValidAction;
export type PresentationDispatch = Dispatch<PresentationAction>;

const PresentationStateContext = createContext<PresentationState | undefined>(undefined);
const PresentationDispatchContext = createContext<PresentationDispatch | undefined>(undefined);

export const presentationReducer = (state: PresentationState, action: PresentationAction): PresentationState => {
  switch (action.type) {
    case 'SET_PRESENTATION':
      return { ...state, presentation: action.payload };
    case 'SET_IS_VERIFIED':
      return { ...state, isVerified: action.payload };
    default:
      throw new Error('Unhandled action type in presentationReducer.');
  }
};

export const setPresentation = (dispatch: PresentationDispatch, presentation: Presentation): void => {
  dispatch({ type: 'SET_PRESENTATION', payload: presentation });
};

export const setIsVerified = (dispatch: PresentationDispatch, isVerified: boolean): void => {
  dispatch({ type: 'SET_IS_VERIFIED', payload: isVerified });
};

export const PresentationProvider: FC<PresentationProviderProps> = ({ children = null }) => {
  const [state, dispatch] = useReducer(presentationReducer, { presentation: undefined, isVerified: undefined });
  return (
    <PresentationStateContext.Provider value={state}>
      <PresentationDispatchContext.Provider value={dispatch}>
        {children}
      </PresentationDispatchContext.Provider>
    </PresentationStateContext.Provider>
  );
};

export const usePresentationState = (): PresentationState => {
  const context = useContext(PresentationStateContext);
  if (context === undefined) {
    throw new Error('PresentationState may only be used within a PresentationProvider.');
  }
  return context;
};

export const usePresentationDispatch = (): PresentationDispatch => {
  const context = useContext(PresentationDispatchContext);
  if (context === undefined) {
    throw new Error('PresentationDispatch may only be used within a PresentationProvider.');
  }
  return context;
};

export const usePresentation = (): [PresentationState, PresentationDispatch] => {
  try {
    const state = usePresentationState();
    const dispatch = usePresentationDispatch();
    return [state, dispatch];
  } catch (e) {
    throw new Error('usePresentation may only be used within a PresentationProvider.');
  }
};
