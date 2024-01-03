import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './Components/ChatPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import NotFound from './Components/NotFound.jsx';
import AuthProvider from './Components/AuthProvider.jsx';
import routes from './Routes.js';
import useAuth from './Hooks/useAuth.jsx';
import store from './Slices/index.js';

const RoutePrivate = ({ children }) => {
  const auth = useAuth();
  return auth.logIn ? children : auth.logOut;
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <div className="d-flex flex-column h-100">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path={routes.chatPagePath()} element={<RoutePrivate><ChatPage /></RoutePrivate>} />
            <Route path={routes.loginPagePath()} element={<LoginPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
