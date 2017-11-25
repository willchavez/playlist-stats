import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import store from './state.js';

const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, 
    document.getElementById('root')
  );
};

renderApp();
