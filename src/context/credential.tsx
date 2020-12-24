import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';

import { Credential, Action, Dispatch, CredentialOptions } from '../types';
import { client } from '../feathers';

export type CredentialState = { credential: Credential | undefined };
type CredentialProviderProps = PropsWithChildren<{}>;

type CredentialActionTypes = 'SET_CREDENTIAL';
export type CredentialAction = Action<CredentialActionTypes, Credential>;
export type CredentialDispatch = Dispatch<CredentialAction>;

const CredentialStateContext = createContext<CredentialState | undefined>(undefined);
const CredentialDispatchContext = createContext<CredentialDispatch | undefined>(undefined);

export const credentialReducer = (state: CredentialState, action: CredentialAction): CredentialState => {
  switch (action.type) {
    case 'SET_CREDENTIAL':
      return { ...state, credential: action.payload };
    default:
      throw new Error('Unhandled action type in credentialReducer.');
  }
};

export const setCredential = (dispatch: CredentialDispatch, credential: Credential): void => {
  dispatch({ type: 'SET_CREDENTIAL', payload: credential });
};

export const issueCredential = async (
  dispatch: CredentialDispatch,
  credentialOptions: CredentialOptions
): Promise<Credential> => {
  const credentialService = client.service('credential');
  const credential = await credentialService.create(credentialOptions);
  setCredential(dispatch, credential.credential);
  return credential;
};

export const CredentialProvider: FC<CredentialProviderProps> = ({ children = null }) => {
  const [state, dispatch] = useReducer(credentialReducer, { credential: undefined });
  return (
    <CredentialStateContext.Provider value={state}>
      <CredentialDispatchContext.Provider value={dispatch}>
        {children}
      </CredentialDispatchContext.Provider>
    </CredentialStateContext.Provider>
  );
};

export const useCredentialState = (): CredentialState => {
  const context = useContext(CredentialStateContext);
  if (context === undefined) {
    throw new Error('CredentialState may only be used within a CredentialProvider.');
  }
  return context;
};

export const useCredentialDispatch = (): CredentialDispatch => {
  const context = useContext(CredentialDispatchContext);
  if (context === undefined) {
    throw new Error('CredentialDispatch may only be used within a CredentialProvider.');
  }
  return context;
};

export const useCredential = (): [CredentialState, CredentialDispatch] => {
  try {
    const state = useCredentialState();
    const dispatch = useCredentialDispatch();
    return [state, dispatch];
  } catch (e) {
    throw new Error('useCredential may only be used within a CredentialProvider.');
  }
};
