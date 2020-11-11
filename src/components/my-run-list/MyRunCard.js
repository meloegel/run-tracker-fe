import { getNodeText } from '@testing-library/react';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UserInfo from '../home-page/UserInfo';


const MyRunCard = ({ run }) => {
    const { push } = useHistory();
    console.log(run)

    const handleDelete = evt => {
        axiosWithAuth()
            .delete(`/api/auth/run-tracker/${run.runTimeID}`)
            .then(res => {
                window.location.reload()
            })
            .catch(error => console.log(error))
    }
    const handleConfirm = evt => {
        const r = window.confirm('Are you sure you want to delete run?')
        if (r === true) {
            handleDelete()
        }
    }

    return (
        <div className='runCard'>
            <h2 className='runTime'>Run Time: {run.runTime}</h2>
            <h2 className='distance'>Distance: {run.distance}</h2>
            <h2 className='pace'>Pace: {run.pace}</h2>
            <h2 className='posted'>Posted: {run.timePosted}</h2>
            <h2 className='description'>Description: {run.description}</h2>
            <h2 className='user'>User: {run.userId}</h2>
            <UserInfo userId={run.userId} />
            <button onClick={handleConfirm}>Delete Run</button>
        </div>
    )
}

export default MyRunCard;