import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext.jsx';
import routes from '../Routes.js';

const AuthProvider = ({ children }) => {
    console.log(localStorage.getItem('userInfo'));
    const getUser = JSON.parse(localStorage.getItem('userInfo'));
    const [token, setToken] = useState(getUser ?? null);

    const navigate = useNavigate();

    const logIn = useCallback((response) => {
        const data = JSON.stringify(response.data);
        localStorage.setItem('userInfo', data);
        setToken(data);
        navigate(routes.chatPagePath());
    }, [navigate]);

    const logOut = useCallback(() => {
        localStorage.removeItem('userInfo');
        setToken(null);
        navigate(routes.loginPagePath());
    }, [navigate]);

    const context = useMemo(() => ({
        token,
        setToken,
        logOut,
        logIn,
    }), [token, setToken, logOut, logIn]);

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
