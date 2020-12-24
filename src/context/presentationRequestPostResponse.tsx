import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';
import { client } from '../feathers';

import {
  PresentationRequestPostResponse,
  Action,
  Dispatch,
  PresentationRequestOptions
} from '../types';

export type PresentationRequestPostResponseState = {
  presentationRequestPostResponse: PresentationRequestPostResponse | undefined
};
type PresentationRequestPostResponseProviderProps = PropsWithChildren<{}>;

type PresentationRequestPostResponseActionTypes = 'SET_PRESENTATIONREQUESTPOSTRESPONSE';
export type PresentationRequestPostResponseAction =
  Action<PresentationRequestPostResponseActionTypes, PresentationRequestPostResponse>;
export type PresentationRequestPostResponseDispatch =
  Dispatch<PresentationRequestPostResponseAction>;

const PresentationRequestPostResponseStateContext =
  createContext<PresentationRequestPostResponseState | undefined>(undefined);
const PresentationRequestPostResponseDispatchContext =
  createContext<PresentationRequestPostResponseDispatch | undefined>(undefined);

export const presentationRequestPostResponseReducer = (
  state: PresentationRequestPostResponseState,
  action: PresentationRequestPostResponseAction
): PresentationRequestPostResponseState => {
  switch (action.type) {
    case 'SET_PRESENTATIONREQUESTPOSTRESPONSE':
      return { ...state, presentationRequestPostResponse: action.payload };
    default:
      throw new Error('Unhandled action type in presentationRequestPostResponseReducer.');
  }
};

export const setPresentationRequestPostResponse = (
  dispatch: PresentationRequestPostResponseDispatch,
  presentationRequestPostResponse: PresentationRequestPostResponse
): void => {
  dispatch({ type: 'SET_PRESENTATIONREQUESTPOSTRESPONSE', payload: presentationRequestPostResponse });
};

export const sendRequest = async (
  dispatch: PresentationRequestPostResponseDispatch,
  options: PresentationRequestOptions
): Promise<PresentationRequestPostResponse> => {
  const presentationRequestService = client.service('presentationRequest');
  const response = await presentationRequestService.create(options);
  setPresentationRequestPostResponse(dispatch, response);
  return response;
};

export const PresentationRequestPostResponseProvider: FC<PresentationRequestPostResponseProviderProps> = (
  { children = null }
) => {
  const [state, dispatch] = useReducer(
    presentationRequestPostResponseReducer,
    { presentationRequestPostResponse: undefined }
  );
  return (
    <PresentationRequestPostResponseStateContext.Provider value={state}>
      <PresentationRequestPostResponseDispatchContext.Provider value={dispatch}>
        {children}
      </PresentationRequestPostResponseDispatchContext.Provider>
    </PresentationRequestPostResponseStateContext.Provider>
  );
};

export const usePresentationRequestPostResponseState =
  (): PresentationRequestPostResponseState => {
    const context = useContext(PresentationRequestPostResponseStateContext);
    if (context === undefined) {
      throw new Error('PresentationRequestPostResponseState may only be used within a PresentationRequestPostResponseProvider.');
    }
    return context;
  };

export const usePresentationRequestPostResponseDispatch =
  (): PresentationRequestPostResponseDispatch => {
    const context = useContext(PresentationRequestPostResponseDispatchContext);
    if (context === undefined) {
      throw new Error('PresentationRequestPostResponseDispatch may only be used within a PresentationRequestPostResponseProvider.');
    }
    return context;
  };

export const usePresentationRequestPostResponse =
  (): [PresentationRequestPostResponseState, PresentationRequestPostResponseDispatch] => {
    try {
      const state = usePresentationRequestPostResponseState();
      const dispatch = usePresentationRequestPostResponseDispatch();
      return [state, dispatch];
    } catch (e) {
      throw new Error('usePresentationRequestPostResponse may only be used within a PresentationRequestPostResponseProvider.');
    }
  };
