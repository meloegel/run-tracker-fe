import React from 'react';
import { useHistory } from 'react-router-dom';
import UserInfo from '../UserInfo';

const RunCard = ({ run }) => {
    const { push } = useHistory();

    return (
        <div className='runCard'>
            <h2 className='runTime'>Run Time: {run.runTime}</h2>
            <h2 className='distance'>Distance: {run.distance}</h2>
            <h2 className='pace'>Pace: {run.pace}</h2>
            <h2 className='posted'>Posted: {run.timePosted}</h2>
            <h2 className='description'>Description: {run.description}</h2>
            <h2 className='user'>User: {run.userId}</h2>
            <UserInfo userId={run.userId} />
        </div>
    )
}

export default RunCard;