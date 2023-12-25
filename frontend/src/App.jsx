import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './Components/ChatPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './Components/AuthProvider.jsx';
import routes from './Routes.js';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.chatPagePath()} element={<ChatPage />} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
