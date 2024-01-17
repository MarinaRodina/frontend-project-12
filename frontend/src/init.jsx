import React from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import resources from './Locales/index.js';
import App from './App.jsx';
import SocketProvider from './Components/SocketProvider.jsx';
import { actions as channelsActions } from './Slices/channelsSlice.js';
import { actions as messagesActions } from './Slices/messagesSlice.js';
import slice from './Slices/index.js';

const init = async () => {
  i18next.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const socket = io();

  socket.on('newChannel', (payload) => {
    slice.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    slice.dispatch(channelsActions.removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    slice.dispatch(channelsActions.renameChannel(payload));
  });

  socket.on('newMessage', (payload) => {
    slice.dispatch(messagesActions.addMessage(payload));
  });

  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <SocketProvider socket={socket}>
          <App />
        </SocketProvider>
      </I18nextProvider>
    </React.StrictMode>
  );
};

export default init;
