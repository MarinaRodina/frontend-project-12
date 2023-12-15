import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  //<Provider>
  <App />
  //</Provider>
);
