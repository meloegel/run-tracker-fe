import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserContext from '../../contexts/UserContext';
import ProfileCard from '../common/ProfileCard';

const initialDetails = {
    username: '',
    email: '',
    location: '',
    avatar: ''
}

const UserProfile = () => {
    const { push } = useHistory();
    const [details, setDetails] = useState(initialDetails);
    const { userId, setUserId } = useContext(UserContext);

    useEffect(() => {
        setUserId({
            userId: window.localStorage.getItem('userId')
        })
        axiosWithAuth()
            .get(`/api/auth/users/${userId.userId}`)
            .then(res => {
                console.log(res);
                setDetails(res.data);
            })
            .catch(err => console.log(err));
    }, [userId.userId, setUserId]);

    const handleChange = evt => {
        setDetails({
            ...details,
            [evt.target.name]: evt.target.value
        })
    }

    const handleSubmit = evt => {
        setUserId({
            userId: window.localStorage.getItem('userId')
        })
        axiosWithAuth()
            .put(`/api/auth/users/${userId.userId}`, details)
            .then(res => {
                console.log(res)
                push(`/account`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <ProfileCard />
            <h2 id='updateUserInfo'>Update Account Information</h2>
            <form id='userInfoForm' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                    value={details.username}
                />
                <div />
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    value={details.email}
                />
                <br />
                <input
                    type="text"
                    name="location"
                    onChange={handleChange}
                    placeholder="Location"
                    value={details.location}
                />
                <div />
                <input
                    type="text"
                    name="avatar"
                    onChange={handleChange}
                    placeholder="Avatar"
                    value={details.avatar}
                />
                <div />
                <button className="update-user-button">Update</button>
            </form>
            <br></br>
            <div className='profilePreview'>
                <h2 className='username'>Username: {details.username}</h2>
                <h2 className='email'>Email: {details.email}</h2>
                <h2 className='location'>Location: {details.location}</h2>
                <img src={details.avatar} alt='Users Avatar' className='avatarImg' />
            </div>
            <br></br>
        </div>
    )
}

export default UserProfile;