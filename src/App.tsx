import React from 'react';

import './App.css';
import UsernameStep from './containers/UsernameStep';
import IssueCredentialStep from './containers/IssueCredentialStep';
import RequestStep from './containers/RequestStep';
import DeeplinkStep from './containers/DeeplinkStep';

function App () {
  return (
    <div className='App'>
      <UsernameStep />
      <IssueCredentialStep />
      <RequestStep />
      <DeeplinkStep />
    </div>
  );
}

export default App;
