import React, { useEffect } from 'react';

import { client } from './feathers';
import { usePresentationDispatch, setPresentation, setIsVerified as setPresentationIsVerified } from './context/presentation';
import { useNoPresentationDispatch, setNoPresentation } from './context/noPresentation';
// import { Presentation, PresentationOrNoPresentationResponse } from './types';
// import { isPresentationResponse, isNoPresentationResponse } from './typeguards';

import './App.css';
import UsernameStep from './containers/UsernameStep';
import IssueCredentialStep from './containers/IssueCredentialStep';
import RequestStep from './containers/RequestStep';
import DeeplinkStep from './containers/DeeplinkStep';
import ShareStep from './components/ShareStep';
import VerifyStep from './containers/VerifyStep';
import RevokeStep from './containers/RevokeStep';
import Logout from './containers/Logout';
import Intro from './components/Intro';
import { DemoNoPresentationDto, DemoPresentationDto } from '@unumid/demo-types';
// import { NoPresentation, Presentation } from '@unumid/types';

const isDemoPresentationDto = (obj: DemoPresentationDto | DemoNoPresentationDto): obj is DemoPresentationDto =>
  !!(obj as DemoPresentationDto).presentation;

// export interface VerificationPresentationResponse {
//   isVerified: boolean;
//   type: 'VerifiablePresentation' | 'NoPresentation';
//   data: Presentation | NoPresentation;
// }

function App () {
  const presentationDispatch = usePresentationDispatch();
  const noPresentationDispatch = useNoPresentationDispatch();

  useEffect(() => {
    const presentationService = client.service('presentationWebsocket');
    presentationService.on('created', (response: DemoPresentationDto | DemoNoPresentationDto) => {
      console.log('on presentation created', response);
      if (isDemoPresentationDto(response)) {
        console.log('is a verified Presentation');
        setPresentation(presentationDispatch, response.presentation);
        setPresentationIsVerified(presentationDispatch, response.isVerified);
      } else {
        console.log('is a verified NoPresentation');
        setNoPresentation(noPresentationDispatch, response.noPresentation);
      }
    });

    return () => {
      presentationService.removeAllListeners();
    };
  }, []);

  // useEffect(() => {
  //   // if (!request?.presentationRequestPostDto) {
  //   //   return;
  //   // }

  //   // now that we've created the request, listen for a presentation
  //   const presentationService = client.service('presentationWebsocket');
  //   presentationService.on('created', (data: DemoPresentationDto | DemoNoPresentationDto) => {
  //     console.log('on presentation created, data', data);

  //     if (isDemoPresentationDto(data)) {
  //       setPresentation(presentationDispatch, response.data);
  //       setPresentationIsVerified(presentationDispatch, response.isVerified);

  //       // customize this route for the specific demo if you want
  //       history.push('/authenticated');
  //     } else {
  //       handleNoPresentationShared(data);

  //       history.push('/declined');
  //     }
  //   });

  //   return () => {
  //     presentationService.removeAllListeners();
  //   };
  // }, [request?.presentationRequestPostDto]);

  return (
    <div className='App'>
      <Intro />
      <UsernameStep />
      <IssueCredentialStep />
      <RequestStep />
      <DeeplinkStep />
      <ShareStep />
      <VerifyStep />
      <RevokeStep />
      <Logout />
    </div>
  );
}

export default App;
