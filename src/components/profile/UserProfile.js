import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserContext from '../../contexts/UserContext';
import ProfileCard from '../common/ProfileCard';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                window.alert('Sucessfully updated profile')
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='profileCard'>
                <ProfileCard />
            </div>
            <form onSubmit={handleSubmit} className='editUserInfoForm'>
                <div className='userProfile'>
                    <h2 id='updateUserInfo'>Update Account Information</h2>
                    <div className='topForm'>
                        <div>
                            <TextField
                                type="text"
                                id='test'
                                style={{ margin: '0 0 1rem 0', width: '30ch' }}
                                variant="filled"
                                name="username"
                                onChange={handleChange}
                                label="Username"
                                value={details.username}
                            />
                            <TextField
                                type="text"
                                style={{ margin: '0 0 1rem 0', width: '30ch' }}
                                variant="filled"
                                name="email"
                                onChange={handleChange}
                                label="Email"
                                value={details.email}
                            />
                        </div>
                        <div>
                            <TextField
                                type="text"
                                style={{ margin: '0 0 1rem 0', width: '30ch' }}
                                variant="filled"
                                name="location"
                                onChange={handleChange}
                                label="Location"
                                value={details.location}
                            />
                            <TextField
                                type="text"
                                style={{ margin: '0 0 1rem 0', width: '30ch' }}
                                variant="filled"
                                name="avatar"
                                multiline
                                rowsMax={10}
                                onChange={handleChange}
                                label="Avatar"
                                value={details.avatar}
                            />
                        </div>
                    </div>
                    <br></br>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        className="update-user-button"
                    >Update</Button>
                </div>
            </form>
            <br></br>
            <h2>Profile Preview</h2>
            <div className='profilePreview'>
                <div className='profilePreviewDiv'>
                    <h2 className='username'>Username: {details.username}</h2>
                    <h2 className='email'>Email: {details.email}</h2>
                    <h2 className='location'>Location: {details.location}</h2>
                </div>
                <img src={details.avatar} alt='Users Avatar' className='avatarImg' />
            </div>
            <br></br>
        </div>
    )
}

export default UserProfile;