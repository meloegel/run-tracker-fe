import React, { useState, useEffect } from 'react';
import registrationSchema from '../../validation/registrationSchema';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const initalFormValues = {
    username: '',
    password: '',
    email: '',
    avatar: ''
};

const initalFormErrors = {
    username: '',
    password: '',
    email: '',
    avatar: ''
}

const initalDisabled = true;
const initialUsers = [];

export default function Registration() {
    const { push } = useHistory();
    const [users, setUser] = useState(initialUsers);
    const [formValues, setFormValues] = useState(initalFormValues);
    const [formErrors, setFormErrors] = useState(initalFormErrors);
    const [disabled, setDisabled] = useState(initalDisabled);

    const onInputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        yup
            .reach(registrationSchema, name)
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
            .post('/api/auth/register', formValues)
            .then((res) => {
                setUser([...users, res.data]);
                push('/login')
            })
            .catch((error) => {
                console.log(error)
            });
    };

    useEffect(() => {
        registrationSchema.isValid(formValues).then((valid) => {
            setDisabled(!valid);
        });
    }, [formValues]);

    return (
        <div className="signup">
            <div>
                <div className="form inputs">
                    <form className="form container" onSubmit={onSubmit} disabled={disabled}>
                        <div className='register-form'>
                            <h2>Register</h2>
                            <div>
                                <TextField
                                    value={formValues.username}
                                    onChange={onInputChange}
                                    style={{ padding: '.5rem', width: '30ch' }}
                                    variant="filled"
                                    label='Username'
                                    name="username"
                                    type="text"
                                />
                                <TextField
                                    value={formValues.password}
                                    style={{ padding: '.5rem', width: '30ch' }}
                                    onChange={onInputChange}
                                    variant="filled"
                                    label='Password'
                                    name="password"
                                    type="text"
                                />
                            </div>
                            <div>
                                <TextField
                                    value={formValues.email}
                                    onChange={onInputChange}
                                    style={{ padding: '.5rem', width: '30ch' }}
                                    variant="filled"
                                    label='Email'
                                    name="email"
                                    type="email"
                                />
                                <TextField
                                    value={formValues.avatar}
                                    style={{ padding: '.5rem', width: '30ch' }}
                                    onChange={onInputChange}
                                    multiline
                                    placeholder='http link'
                                    rowsMax={6}
                                    variant="filled"
                                    label='Avatar'
                                    name="avatar"
                                    type="text"
                                />
                            </div>
                            <div id='submit'>
                                <div className="errors">
                                    <div>{formErrors.username}</div>
                                    <div>{formErrors.password}</div>
                                    <div>{formErrors.email}</div>
                                </div>
                                <Button
                                    onClick={onSubmit}
                                    variant="contained"
                                    className="submit"
                                >Submit</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}