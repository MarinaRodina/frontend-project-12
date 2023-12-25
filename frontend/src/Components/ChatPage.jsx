import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../Routes.js';
import useAuth from '../Hooks/useAuth.jsx';

const ChatPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            navigate(routes.loginPagePath());
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(routes.usersPath(), {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userId')).token}` },
                });
                navigate(routes.chatPagePath());
            } catch (err) {
                console.log('ERROR', err);
                if (err.response && err.response.status === 401) {
                    auth.logOut();
                }
            }
        };
        fetchData();
    }, [auth, navigate]);
};

export default ChatPage;