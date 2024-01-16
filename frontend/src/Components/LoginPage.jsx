import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth.jsx';
import routes from '../Routes.js';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../images/avatar1.jpg';


const LoginPage = () => {
    const auth = useAuth();
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const loginSchema = yup.object().shape({
        username: yup.string().trim().required('Заполните это поле'),
        password: yup.string().trim().required('Заполните это поле'),
    });

    const {
        values, errors, handleChange, handleSubmit, setSubmitting, isSubmitting
    } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        validateOnChange: false,
        errorToken: false,
        onSubmit: () => {
            setSubmitting(true);
            axios.post(routes.loginPath(), { username: values.username, password: values.password })
                .then((response) => {
                    auth.logIn(response)
                    navigate(routes.chatPagePath());
                })
                .catch(() => {
                    setSubmitting(false);
                })
        },
    });

    return (
        <>
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-content-center h-100">
                    <div className="col-12 col-md-8 col-xxl-6">
                        <div className="card shadow-sm">
                            <div className="card-body row p-5">
                                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                    <img src={avatar1} className="rounded-circle" alt={t('login.loginHeader')} />
                                </div>
                                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                                    <h1 className="text-center mb-4">{t('login.loginHeader')}</h1>
                                    <Form.Group className="form-floating mb-3">
                                        <Form.Control
                                            ref={inputRef}
                                            name="username"
                                            autoComplete="username"
                                            required=""
                                            placeholder={t('login.yourNickname')}
                                            id="username"
                                            className="form-control"
                                            value={values.username}
                                            onChange={handleChange}
                                        />
                                        <Form.Label htmlFor="username">{t('login.yourNickname')}</Form.Label>
                                    </Form.Group>
                                    <Form.Group className="form-floating mb-4">
                                        <Form.Control
                                            name="password"
                                            autoComplete="current-password"
                                            required=""
                                            placeholder={t('login.password')}
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <Form.Label className="form-label" htmlFor="password">{t('login.password')}</Form.Label>
                                    </Form.Group>
                                    <Button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="w-100 mb-3 btn btn-primary">
                                        {t('login.loginHeader')}
                                    </Button>
                                </Form>
                            </div>
                            <div className="card-footer p-4">
                                <div className="text-center">
                                    <span>{t('login.noAccount')}</span>
                                    <Link to={routes.signupPagePath()}>{t('login.registration')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Toastify"></div>
        </>
    );
};

export default LoginPage;
