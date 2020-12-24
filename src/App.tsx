import React from 'react';

import './App.css';
import UsernameStep from './containers/UsernameStep';
import IssueCredentialStep from './containers/IssueCredentialStep';

function App () {
  return (
    <div className='App'>
      <UsernameStep />
      <IssueCredentialStep />
    </div>
  );
}

export default App;
