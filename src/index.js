import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from 'easy-peasy';
import storeState from './storeState';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={storeState}>
      <Router>
        <Route path="/" component={App}/>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


