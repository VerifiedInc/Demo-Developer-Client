import React from 'react';
import ReactDOM from 'react-dom';
import LogRocket from 'logrocket';

import 'typeface-lato';
import 'typeface-playfair-display';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from './context';

LogRocket.init(process.env.REACT_APP_LOG_ROCKET_ID || '');

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
