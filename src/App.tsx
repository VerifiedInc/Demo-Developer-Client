import React from 'react';

import './App.css';
import UsernameStep from './containers/UsernameStep';
import IssueCredentialStep from './containers/IssueCredentialStep';
import RequestStep from './containers/RequestStep';

function App () {
  return (
    <div className='App'>
      <UsernameStep />
      <IssueCredentialStep />
      <RequestStep />
    </div>
  );
}

export default App;
