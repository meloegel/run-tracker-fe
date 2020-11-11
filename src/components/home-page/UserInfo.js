import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';


const initialDetails = {
    username: '',
    location: '',
    avatar: ''
}


const UserInfo = ({ userId }) => {
    console.log(userId)
    const [userInfo, setUserInfo] = useState(initialDetails)

    useEffect(() => {
        axiosWithAuth()
            .get(`api/run-tracker/user/${userId}`)
            .then(res => {
                console.log(res)
                setUserInfo(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    console.log(userInfo)
    return (
        <div>
            <h2 className='username'>Username: {userInfo.username}</h2>
            <h2 className='location'>Location: {userInfo.location}</h2>
            <img src={userInfo.avatar} alt='Users Avatar' className='avatarImg' />
        </div>
    )
}

export default UserInfo;