import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserContext from '../../contexts/UserContext';
import Typography from '@material-ui/core/Typography';

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
            <Typography className='username'>Username: {userInfo.username}</Typography>
            <Typography className='location'>Location: {userInfo.location}</Typography>
            <img src={userInfo.avatar} alt='Users Avatar' className='avatarImg' />
        </div>
    )
}

export default PersonalInfo;