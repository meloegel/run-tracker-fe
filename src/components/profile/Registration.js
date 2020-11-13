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
    email: ''
};

const initalFormErrors = {
    username: '',
    password: '',
    email: ''
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
                <div>
                    <h2>Sign Up</h2>
                </div>
                <div className="form inputs">
                    <h4>General Information</h4>
                    <form className="form container" onSubmit={onSubmit} disabled={disabled}>
                        <TextField
                            value={formValues.username}
                            onChange={onInputChange}
                            style={{ padding: '.5rem' }}
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
                        <TextField
                            value={formValues.email}
                            onChange={onInputChange}
                            style={{ padding: '.5rem' }}
                            variant="filled"
                            label='Email'
                            name="email"
                            type="email"
                        />
                        <div>
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
                    </form>
                </div>
            </div>
        </div>
    );

}