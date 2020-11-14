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
                <div className="login-form">
                    <h2>Login</h2>
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
                    <div className="errors">
                        <div>{formErrors.username}</div>
                        <div>{formErrors.password}</div>
                    </div>
                    <div id="login-btn">
                        <div className='registerOnLogin'>
                            <h4>Dont have an account?</h4>
                            <Button
                                onClick={() => push('/register')}
                                variant="contained"
                                style={{ height: '4.5vh', width: '6rem', margin: '0 auto' }}
                                className="register"
                            >Register</Button>
                        </div>
                        <div className='registerOnLogin'>
                            <h4>Press to Login</h4>
                            <Button
                                onClick={onSubmit}
                                variant="contained"
                                className="submit"
                            >Login</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}