import React, { useEffect } from 'react';

import { client } from './feathers';
import { usePresentationDispatch, setPresentation, setIsVerified as setPresentationIsVerified } from './context/presentation';
import { useNoPresentationDispatch, setNoPresentation } from './context/noPresentation';
import { PresentationOrNoPresentationResponse } from './types';
import { isPresentationResponse, isNoPresentationResponse } from './typeguards';

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

function App () {
  const presentationDispatch = usePresentationDispatch();
  const noPresentationDispatch = useNoPresentationDispatch();

  useEffect(() => {
    const presentationService = client.service('presentation');
    presentationService.on('created', (response: PresentationOrNoPresentationResponse) => {
      console.log('on presentation created', response);
      if (isPresentationResponse(response)) {
        setPresentation(presentationDispatch, response.data);
        setPresentationIsVerified(presentationDispatch, response.isVerified);
      } else if (isNoPresentationResponse(response)) {
        setNoPresentation(noPresentationDispatch, response.data);
      }
    });

    return () => {
      presentationService.removeAllListeners();
    };
  }, []);

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
