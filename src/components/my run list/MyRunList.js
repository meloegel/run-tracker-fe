import React, { useEffect, useContext } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import RunTrackerContext from '../../contexts/RunTrackerContext';
import UserContext from '../../contexts/UserContext';
import RunList from './RunList';

const MyRunList = () => {
    const { push } = useHistory();
    const { runList, setRunList } = useContext(RunTrackerContext);
    const { userId, setUserId } = useContext(UserContext);

    const getUserRuns = () => {
        setUserId({
            userId: window.localStorage.getItem('userId')
        })
        setRunList([])
        axiosWithAuth()
            .get(`/api/auth/run-tracker/user/${userId.userId}`)
            .then(res => setRunList(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserRuns(userId.userId)
    }, [userId.userId])

    return (
        <div>
            <h1>My Run List</h1>
            <div>
                <RunList />
            </div>
            <button onClick={() => push('/add-run')}>Add Run</button>
        </div>
    )
}

export default MyRunList;