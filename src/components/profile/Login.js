import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import loginSchema from '../../validation/loginSchema';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const initialFormValues = {
    username: '',
    password: ''
};

const initialFormErrors = {
    username: '',
    password: ''
};

const initialDisabled = true;

export default function Login() {
    const { push } = useHistory();
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled);

    const onInputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        yup
            .reach(loginSchema, name)
            .validate(value)
            .then((valid) => {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                });
            })
            .catch((error) => {
                setFormErrors({
                    ...formErrors,
                    [name]: error.errors[0],
                });
            });
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        axiosWithAuth()
            .post('/api/auth/login', formValues)
            .then((res) => {
                console.log(res.data.user.id, 'resdata');
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.user.id);
                push('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        loginSchema.isValid(formValues).then((valid) => {
            setDisabled(!valid);
        });
    }, [formValues]);

    return (

        <div className="login container">
            <form className="form container" onSubmit={onSubmit} disabled={disabled}>
                <div id="login-title">
                    <h2>Log In</h2>
                </div>
                <div className="login form">
                    <h4>Login Information</h4>
                    <TextField
                        value={formValues.username}
                        style={{ padding: '.5rem' }}
                        onChange={onInputChange}
                        variant="filled"
                        label='Username'
                        name="username"
                        type="text"
                    />
                    <TextField
                        value={formValues.password}
                        style={{ padding: '.5rem' }}
                        onChange={onInputChange}
                        variant="filled"
                        label='Password'
                        name="password"
                        type="text"
                    />
                    <div id="login-btn">
                        <Button
                            onClick={onSubmit}
                            variant="contained"
                            className="submit"
                        >Login</Button>
                    </div>
                    <div className="errors">
                        <div>{formErrors.username}</div>
                        <div>{formErrors.password}</div>
                    </div>
                </div>
            </form>
        </div >
    );
}