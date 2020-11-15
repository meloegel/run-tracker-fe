import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

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
        <div className='profileCard'>
            <Card >
                <CardContent className='profileCardContent'>
                    <div >
                        <Typography id='profileCardContent'><span className='profileCardTitle'>Username:</span> {details.username}</Typography>
                        <Typography id='profileCardContent'><span className='profileCardTitle'>Email:</span> {details.email}</Typography>
                        <Typography id='profileCardContent'><span className='profileCardTitle'>Location:</span> {details.location}</Typography>
                    </div>
                    <img src={details.avatar} alt='Users Avatar' className='avatarImg' />
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileCard;