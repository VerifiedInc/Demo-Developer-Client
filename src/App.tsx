import React from 'react';

import './App.css';
import UsernameStep from './containers/UsernameStep';
import IssueCredentialStep from './containers/IssueCredentialStep';
import RequestStep from './containers/RequestStep';
import DeeplinkStep from './containers/DeeplinkStep';
import ShareStep from './components/ShareStep';

function App () {
  return (
    <div className='App'>
      <UsernameStep />
      <IssueCredentialStep />
      <RequestStep />
      <DeeplinkStep />
      <ShareStep />
    </div>
  );
}

export default App;
