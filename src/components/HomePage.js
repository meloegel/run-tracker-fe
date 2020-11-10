import React, { useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import RunTrackerContext from '../contexts/RunTrackerContext';

import RunList from './RunList';

const HomePage = () => {
    const { push } = useHistory();
    const { setRunList } = useContext(RunTrackerContext);

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
            <div>
                <RunList />
            </div>
            <button onClick={() => push('/register')}>Make account here!</button>
        </div>
    )
}

export default HomePage;