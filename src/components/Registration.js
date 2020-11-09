import React, { useState, useEffect } from 'react';
import registrationSchema from '../validation/registrationSchema';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

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
                    <form className="form container" onSubmit={onSubmit}>
                        <label> Username:
                            <input
                                value={formValues.username}
                                onChange={onInputChange}
                                name="username"
                                type="text"
                            />
                        </label>
                        <label> Password:
                            <input
                                value={formValues.password}
                                onChange={onInputChange}
                                name="password"
                                type="text"
                            />
                        </label>
                        <label> Email:
                            <input
                                value={formValues.email}
                                onChange={onInputChange}
                                name="email"
                                type="email"
                            />
                        </label>
                        <div>
                            <div className="errors">
                                <div>{formErrors.username}</div>
                                <div>{formErrors.password}</div>
                                <div>{formErrors.email}</div>
                            </div>
                            <button className="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}