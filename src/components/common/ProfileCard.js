import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const initialDetails = {
    username: '',
    email: '',
    location: '',
    avatar: ''
}

const ProfileCard = () => {
    const { userId, setUserId } = useContext(UserContext);
    const [details, setDetails] = useState(initialDetails)

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

    return (
        <div>
            <div className='profileCard'>
                <div>
                    <h2 className='username'>Username: {details.username}</h2>
                    <h2 className='email'>Email: {details.email}</h2>
                    <h2 className='location'>Location: {details.location}</h2>
                </div>
                <img src={details.avatar} alt='Users Avatar' className='avatarImg' />
            </div>
        </div>
    )
}

export default ProfileCard;