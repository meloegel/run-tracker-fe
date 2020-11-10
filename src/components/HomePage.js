import React, { useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import RunTrackerContext from '../contexts/RunTrackerContext';


const HomePage = () => {
    const { push } = useHistory();
    const { setRunList } = useContext(RunTrackerContext);
    const { userId, setUserId } = useContext(UserContext);

    const getAllPublishedRuns = () => {
        axiosWithAuth()
            .get('/api/auth/run-tracker/runs')
            .then(res => setRunList(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllPublishedRuns();
    })

    return (
        <div>
            <h1>Run Tracker</h1>
        </div>
    )
}

export default HomePage;