import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import Typography from '@material-ui/core/Typography';

const initialDetails = {
    username: '',
    location: '',
    avatar: ''
}


const UserInfo = ({ userId }) => {
    const [userInfo, setUserInfo] = useState(initialDetails)

    useEffect(() => {
        axiosWithAuth()
            .get(`api/run-tracker/user/${userId}`)
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Typography className='username'>Username: {userInfo.username}</Typography>
            <Typography className='location'>Location: {userInfo.location}</Typography>
            <img src={userInfo.avatar} alt='Users Avatar' className='avatarImg' />
        </div>
    )
}

export default UserInfo;