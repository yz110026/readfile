import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from 'easy-peasy';
import storeState from './storeState';
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={storeState}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


