import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext.jsx';
import routes from '../Routes.js';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return user ?? null;
  };

  useEffect(() => {
    const user = getCurrentUser();
    setToken(user);
  }, []);

  const logIn = useCallback((response) => {
    const data = JSON.stringify(response.data);
    localStorage.setItem('userInfo', data);
    setToken(data);
    navigate(routes.chatPagePath());
  }, [setToken, navigate]);

  const logOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    setToken(null);
    navigate(routes.loginPagePath());
  }, [setToken, navigate]);

  const context = useMemo(() => ({
    token,
    getCurrentUser,
    logOut,
    logIn,
  }), [token, getCurrentUser, logOut, logIn]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
