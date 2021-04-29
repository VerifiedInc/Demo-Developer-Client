import { PresentationRequestPostDto } from '@unumid/types';
import React, {
  createContext,
  useContext,
  FC,
  useReducer,
  PropsWithChildren
} from 'react';
import { client } from '../feathers';

import {
  Action,
  Dispatch,
  PresentationRequestOptions
} from '../types';

export type PresentationRequestPostDtoState = {
  presentationRequestPostDto: PresentationRequestPostDto | undefined
};
type PresentationRequestPostDtoProviderProps = PropsWithChildren<{}>;

type PresentationRequestPostDtoActionTypes = 'SET_PRESENTATIONREQUESTPOSTDTO';
export type PresentationRequestPostDtoAction =
  Action<PresentationRequestPostDtoActionTypes, PresentationRequestPostDto>;

export type PresentationRequestPostDtoDispatch =
  Dispatch<PresentationRequestPostDtoAction>;

const PresentationRequestPostDtoStateContext =
  createContext<PresentationRequestPostDtoState | undefined>(undefined);
const PresentationRequestPostDtoDispatchContext =
  createContext<PresentationRequestPostDtoDispatch | undefined>(undefined);

// export const presentationRequestPostDtoReducer = (
//   state: PresentationRequestPostDto,
//   action: PresentationRequestPostDtoAction
// ): PresentationRequestPostDtoState => {
//   switch (action.type) {
//     case 'SET_PRESENTATIONREQUESTPOSTDTO':
//       return { ...state, presentationRequestPostDto: action.payload };
//     default:
//       throw new Error('Unhandled action type in presentationRequestPostDtoReducer.');
//   }
// };

export const presentationRequestPostDtoReducer = (
  state: PresentationRequestPostDtoState,
  action: PresentationRequestPostDtoAction
): PresentationRequestPostDtoState => {
  switch (action.type) {
    case 'SET_PRESENTATIONREQUESTPOSTDTO':
      return { ...state, presentationRequestPostDto: action.payload };
    default:
      throw new Error('Unhandled action type in presentationRequestPostResponseReducer.');
  }
};

export const setPresentationRequestPostDto = (
  dispatch: PresentationRequestPostDtoDispatch,
  presentationRequestPostDto: PresentationRequestPostDto
): void => {
  dispatch({ type: 'SET_PRESENTATIONREQUESTPOSTDTO', payload: presentationRequestPostDto });
};

export const sendRequest = async (
  dispatch: PresentationRequestPostDtoDispatch,
  options: PresentationRequestOptions
): Promise<PresentationRequestPostDto> => {
  const presentationRequestService = client.service('presentationRequest');
  const response = await presentationRequestService.create(options);
  setPresentationRequestPostDto(dispatch, response.data);
  return response.data;
};

export const PresentationRequestPostDtoProvider: FC<PresentationRequestPostDtoProviderProps> = (
  { children = null }
) => {
  const [state, dispatch] = useReducer(presentationRequestPostDtoReducer, { presentationRequestPostDto: undefined });
  return (
    <PresentationRequestPostDtoStateContext.Provider value={state}>
      <PresentationRequestPostDtoDispatchContext.Provider value={dispatch}>
        {children}
      </PresentationRequestPostDtoDispatchContext.Provider>
    </PresentationRequestPostDtoStateContext.Provider>
  );
};

export const usePresentationRequestPostDtoState =
  (): PresentationRequestPostDtoState => {
    const context = useContext(PresentationRequestPostDtoStateContext);
    if (context === undefined) {
      throw new Error('PresentationRequestPostDtoState may only be used within a PresentationRequestPostDtoProvider.');
    }
    return context;
  };

export const usePresentationRequestPostDtoDispatch =
  (): PresentationRequestPostDtoDispatch => {
    const context = useContext(PresentationRequestPostDtoDispatchContext);
    if (context === undefined) {
      throw new Error('PresentationRequestPostDtoDispatch may only be used within a PresentationRequestPostDtoProvider.');
    }
    return context;
  };

export const usePresentationRequestPostDto =
  (): [PresentationRequestPostDtoState, PresentationRequestPostDtoDispatch] => {
    try {
      const state = usePresentationRequestPostDtoState();
      const dispatch = usePresentationRequestPostDtoDispatch();
      return [state, dispatch];
    } catch (e) {
      throw new Error('usePresentationRequestPostDto may only be used within a PresentationRequestPostDtoProvider.');
    }
  };
