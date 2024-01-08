import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const Application = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init());
};

Application();
