import React, { useState, useMemo } from 'react';
import AuthContext from '../Contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem('userId'));
    const [user, setUser] = useState(userData || null);

    const logIn = (data) => {
        localStorage.setItem('userId', JSON.stringify(data));
        setUser(data);
    };

    const logOut = () => setUser(null);

    const auth = useMemo(() => ({ user, logIn, logOut }), [user, logIn, logOut]);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;