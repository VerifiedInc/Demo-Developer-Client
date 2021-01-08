import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';

import { CredentialStatus, Action, Dispatch } from '../types';
import { client } from '../feathers';

export type CredentialStatusState = { credentialStatus: CredentialStatus | undefined };
type CredentialStatusProviderProps = PropsWithChildren<{}>;

type CredentialStatusActionTypes = 'SET_CREDENTIAL_STATUS';
export type CredentialStatusAction = Action<CredentialStatusActionTypes, CredentialStatus>;
export type CredentialStatusDispatch = Dispatch<CredentialStatusAction>;

const CredentialStatusStateContext = createContext<CredentialStatusState | undefined>(undefined);
const CredentialStatusDispatchContext = createContext<CredentialStatusDispatch | undefined>(undefined);

export const credentialStatusReducer = (state: CredentialStatusState, action: CredentialStatusAction): CredentialStatusState => {
  switch (action.type) {
    case 'SET_CREDENTIAL_STATUS':
      return { ...state, credentialStatus: action.payload };
    default:
      throw new Error('Unhandled action type in credentialStatusReducer.');
  }
};

export const setCredentialStatus = (dispatch: CredentialStatusDispatch, credentialStatus: CredentialStatus): void => {
  dispatch({ type: 'SET_CREDENTIAL_STATUS', payload: credentialStatus });
};

export const revokeCredential = async (
  dispatch: CredentialStatusDispatch,
  credentialId: string,
  issuerUuid: string
): Promise<CredentialStatus> => {
  const credentialStatusService = client.service('credentialStatus');
  const credentialStatus = await credentialStatusService.patch(
    credentialId,
    { issuerUuid, status: 'revoked' }
  );
  setCredentialStatus(dispatch, credentialStatus);
  return credentialStatus;
};

export const CredentialStatusProvider: FC<CredentialStatusProviderProps> = ({ children = null }) => {
  const [state, dispatch] = useReducer(credentialStatusReducer, { credentialStatus: undefined });
  return (
    <CredentialStatusStateContext.Provider value={state}>
      <CredentialStatusDispatchContext.Provider value={dispatch}>
        {children}
      </CredentialStatusDispatchContext.Provider>
    </CredentialStatusStateContext.Provider>
  );
};

export const useCredentialStatusState = (): CredentialStatusState => {
  const context = useContext(CredentialStatusStateContext);
  if (context === undefined) {
    throw new Error('CredentialStatusState may only be used within a CredentialStatusProvider.');
  }
  return context;
};

export const useCredentialStatusDispatch = (): CredentialStatusDispatch => {
  const context = useContext(CredentialStatusDispatchContext);
  if (context === undefined) {
    throw new Error('CredentialStatusDispatch may only be used within a CredentialStatusProvider.');
  }
  return context;
};

export const useCredentialStatus = (): [CredentialStatusState, CredentialStatusDispatch] => {
  try {
    const state = useCredentialStatusState();
    const dispatch = useCredentialStatusDispatch();
    return [state, dispatch];
  } catch (e) {
    throw new Error('useCredentialStatus may only be used within a CredentialStatusProvider.');
  }
};
