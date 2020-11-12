import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserContext from '../../contexts/UserContext';


const initialDetails = {
    username: '',
    location: '',
    avatar: ''
}


const PersonalInfo = () => {
    const [userInfo, setUserInfo] = useState(initialDetails)
    const { userId, setUserId } = useContext(UserContext);

    useEffect(() => {
        setUserId({
            userId: window.localStorage.getItem('userId')
        })
        axiosWithAuth()
            .get(`api/run-tracker/user/${userId.userId}`)
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(err => console.log(err))
    }, [userId.userId, setUserId])

    return (
        <div>
            <h2 className='username'>Username: {userInfo.username}</h2>
            <h2 className='location'>Location: {userInfo.location}</h2>
            <img src={userInfo.avatar} alt='Users Avatar' className='avatarImg' />
        </div>
    )
}

export default PersonalInfo;