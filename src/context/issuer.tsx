import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';
import { client } from '../feathers';

import { Issuer, Action, Dispatch } from '../types';

export type IssuerState = { issuer: Issuer | undefined };
type IssuerProviderProps = PropsWithChildren<{}>;

type IssuerActionTypes = 'SET_ISSUER';
export type IssuerAction = Action<IssuerActionTypes, Issuer>;
export type IssuerDispatch = Dispatch<IssuerAction>;

const IssuerStateContext = createContext<IssuerState | undefined>(undefined);
const IssuerDispatchContext = createContext<IssuerDispatch | undefined>(undefined);

export const issuerReducer = (state: IssuerState, action: IssuerAction): IssuerState => {
  switch (action.type) {
    case 'SET_ISSUER':
      return { ...state, issuer: action.payload };
    default:
      throw new Error('Unhandled action type in issuerReducer.');
  }
};

export const setIssuer = (dispatch: IssuerDispatch, issuer: Issuer): void => {
  dispatch({ type: 'SET_ISSUER', payload: issuer });
};

export const getDefaultIssuer = async (dispatch: IssuerDispatch): Promise<Issuer> => {
  const issuerService = client.service('issuer');
  const issuer = await issuerService.get('cc09a71f-2996-46b4-b643-28d60d845564');
  setIssuer(dispatch, issuer);
  return issuer;
};

export const IssuerProvider: FC<IssuerProviderProps> = ({ children = null }) => {
  const [state, dispatch] = useReducer(issuerReducer, { issuer: undefined });
  return (
    <IssuerStateContext.Provider value={state}>
      <IssuerDispatchContext.Provider value={dispatch}>
        {children}
      </IssuerDispatchContext.Provider>
    </IssuerStateContext.Provider>
  );
};

export const useIssuerState = (): IssuerState => {
  const context = useContext(IssuerStateContext);
  if (context === undefined) {
    throw new Error('IssuerState may only be used within an IssuerProvider.');
  }

  return context;
};

export const useIssuerDispatch = (): IssuerDispatch => {
  const context = useContext(IssuerDispatchContext);
  if (context === undefined) {
    throw new Error('IssuerDispatch may only be used within an IssuerProvider.');
  }

  return context;
};

export const useIssuer = (): [IssuerState, IssuerDispatch] => {
  try {
    const state = useIssuerState();
    const dispatch = useIssuerDispatch();
    return [state, dispatch];
  } catch (e) {
    throw new Error('useIssuer may only be used within an IssuerProvider.');
  }
};
