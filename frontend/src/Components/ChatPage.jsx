/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth.jsx';
import routes from '../Routes.js';

const ChatPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (!localStorage.getItem('userInfo')) {
            navigate(routes.loginPagePath());
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(routes.usersPath(), {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
                });
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [auth]);

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <p>Chat Page!!!</p>
            </div>
        </div>
    );
};

export default ChatPage;