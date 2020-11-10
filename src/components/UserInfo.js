import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';



const UserInfo = ({ userId }) => {
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/auth/users/${userId.userId}`)
            .then(res => {
                console.log(res)
                setUserInfo(res.data)
            })
            .catch(err => console.log(err))
    })

    return (
        <div>
            <h2 className='userId'>User: {userInfo.userId}</h2>
            <h2 className='username'>Username: {userInfo.username}</h2>
            <h2 className='location'>Location: {userInfo.location}</h2>
            <img src={userInfo.avatar} alt='Users Avatar' />
        </div>
    )
}

export default UserInfo;