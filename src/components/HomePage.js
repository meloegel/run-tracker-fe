import React, { useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import RunTrackerContext from '../contexts/RunTrackerContext';
import RunList from './RunList';
import UserContext from '../contexts/UserContext';

const HomePage = () => {
    const { push } = useHistory();
    const { runList, setRunList } = useContext(RunTrackerContext);
    const { userId } = useContext(UserContext);

    const getAllPublishedRuns = () => {
        axiosWithAuth()
            .get('api/run-tracker/runs')
            .then(res => setRunList(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllPublishedRuns();
    }, [])


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