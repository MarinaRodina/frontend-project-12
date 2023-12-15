import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from "react-dom";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Formik, Field, Form } from "formik";
import {
    Button,
    //Form,
    Container,
    Row,
    Col,
    Card,
    FloatingLabel,
} from 'react-bootstrap';



const loginSchema = () => yup.object().shape({
    username: yup.string().trim().required(),
    password: yup.string().trim().required().min(6),
});


const LoginPage = () => {

    //<Formik
    //initialValues={{ username: '', password: '', }}
    //onSubmit={async (values) => {
    //await new Promise((resolve) => setTimeout(resolve, 500));
    //alert(JSON.stringify(values, null, 2));
    //}}
    //>
    //<Form>
    //<Field name="username" type="text" />
    //<Field name="password" type="email" />
    // <button type="submit">Submit</button>
    //</Form>
    //</Formik>

    //const formik = useFormik({
    //initialValues: {
    //username: '',
    // password: '',
    //},
    //onSubmit: (values) => {
    //...
    //},
    //});

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
                                    <form className="col-12 col-md-6 mt-3 mt-mb-0">
                                        <h1 className="text-center mb-4">Войти</h1>
                                        <div className="form-floating mb-3">
                                            <input name="username" autocomplete="username" required="" placeholder="Ваш ник" id="username" className="form-control" value="" />
                                            <label for="username">Ваш ник</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input name="password" autocomplete="current-password" required="" placeholder="Пароль" type="password" id="password" className="form-control" value="" />
                                            <label className="form-label" for="password">Пароль</label>
                                        </div>
                                        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                                    </form>
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
            </div><div className="Toastify"></div>
        </>
    );
};

export default LoginPage;
