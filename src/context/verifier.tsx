import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';

import { Verifier, Action, Dispatch } from '../types';

export type VerifierState = { verifier: Verifier | undefined };
type VerifierProviderProps = PropsWithChildren<{}>;

type VerifierActionTypes = 'SET_VERIFIER';
export type VerifierAction = Action<VerifierActionTypes, Verifier>;
export type VerifierDispatch = Dispatch<VerifierAction>;

const VerifierStateContext = createContext<VerifierState | undefined>(undefined);
const VerifierDispatchContext = createContext<VerifierDispatch | undefined>(undefined);

export const verifierReducer = (state: VerifierState, action: VerifierAction): VerifierState => {
  switch (action.type) {
    case 'SET_VERIFIER':
      return { ...state, verifier: action.payload };
    default:
      throw new Error('Unhandled action type in verifierReducer.');
  }
};

export const setVerifier = (dispatch: VerifierDispatch, verifier: Verifier): void => {
  dispatch({ type: 'SET_VERIFIER', payload: verifier });
};

export const VerifierProvider: FC<VerifierProviderProps> = ({ children = null }) => {
  const [state, dispatch] = useReducer(verifierReducer, { verifier: undefined });
  return (
    <VerifierStateContext.Provider value={state}>
      <VerifierDispatchContext.Provider value={dispatch}>
        {children}
      </VerifierDispatchContext.Provider>
    </VerifierStateContext.Provider>
  );
};

export const useVerifierState = (): VerifierState => {
  const context = useContext(VerifierStateContext);
  if (context === undefined) {
    throw new Error('VerifierState may only be used within a VerifierProvider.');
  }
  return context;
};

export const useVerifierDispatch = (): VerifierDispatch => {
  const context = useContext(VerifierDispatchContext);
  if (context === undefined) {
    throw new Error('VerifierDispatch may only be used within a VerifierProvider.');
  }
  return context;
};

export const useVerifier = (): [VerifierState, VerifierDispatch] => {
  try {
    const state = useVerifierState();
    const dispatch = useVerifierDispatch();
    return [state, dispatch];
  } catch (e) {
    throw new Error('useVerifier may only be used within a VerifierProvider.');
  }
};
