import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './Components/ChatPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import NotFound from './Components/NotFound.jsx';
import AuthProvider from './Components/AuthProvider.jsx';
import routes from './Routes.js';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.chatPagePath()} element={<ChatPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
