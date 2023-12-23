import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import useAuth from '../Hooks/useAuth.jsx';
import routes from '../Routes.js';

const loginSchema = yup.object().shape({
    username: yup.string().trim().required(),
    password: yup.string().trim().required().min(6),
});

const LoginPage = () => {
    const auth = useAuth();
    const [authFailed, setAuthFailed] = useState(false);
    const inputRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            setAuthFailed(false);

            try {
                const res = await axios.post(routes.loginPath(), values);
                localStorage.setItem('userId', JSON.stringify(res.data));
                auth.logIn();
                const { from } = location.state;
                navigate(from);
            } catch (err) {
                formik.setSubmitting(false);
                if (err.isAxiosError && err.response.status === 401) {
                    setAuthFailed(true);
                    inputRef.current.select();
                    return;
                }
                throw err;
            }

        },
    });

    return (
        <>
            <div className="d-flex flex-column h-100">
                <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a>
                    </div>
                </nav>
                <div className="container-fluid h-100">
                    <div className="row justify-content-center align-content-center h-100">
                        <div className="col-12 col-md-8 col-xxl-6">
                            <div className="card shadow-sm">
                                <div className="card-body row p-5">
                                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                        <img src="***" className="rounded-circle" alt="Войти" />
                                    </div>
                                    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                                        <h1 className="text-center mb-4">Войти</h1>
                                        <Form.Group className="form-floating mb-3">
                                            <Form.Control
                                                ref={inputRef}
                                                name="username"
                                                autocomplete="username"
                                                required=""
                                                placeholder="Ваш ник"
                                                id="username"
                                                className="form-control"
                                                value={formik.values.username}
                                                onChange={formik.handleChange}
                                                isInvalid={authFailed}
                                            />
                                            <Form.Label htmlFor="username">Ваш ник</Form.Label>
                                        </Form.Group>
                                        <Form.Group className="form-floating mb-4">
                                            <Form.Control
                                                name="password"
                                                autocomplete="current-password"
                                                required=""
                                                placeholder="Пароль"
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                isInvalid={authFailed}
                                            />
                                            <Form.Label className="form-label" htmlFor="password">Пароль</Form.Label>
                                        </Form.Group>
                                        <Button
                                            type="submit"
                                            disabled={formik.isSubmitting}
                                            className="w-100 mb-3 btn btn-primary">
                                            Войти
                                        </Button>
                                    </Form>
                                </div>
                                <div className="card-footer p-4">
                                    <div className="text-center">
                                        <span>Нет аккаунта? </span>
                                        <a href="/signup">Регистрация</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="Toastify"></div>
        </>
    );
};

export default LoginPage;
