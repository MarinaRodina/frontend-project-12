import React from 'react';
import { io } from 'socket.io-client';
import App from './App.jsx';
import SocketProvider from './Components/SocketProvider.jsx';
import { actions as channelsActions } from './Slices/channelsSlice.js';
import { actions as messagesActions } from './Slices/messagesSlice.js';
import slice from './Slices/index.js';

const init = async () => {
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
            <SocketProvider socket={socket}>
                <App />
            </SocketProvider>
        </React.StrictMode>
    );
};

export default init;
