import React, { useEffect, useContext } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import RunTrackerContext from '../../contexts/RunTrackerContext';
import UserContext from '../../contexts/UserContext';
import PersonalRunList from './PersonalRunList';
import Button from '@material-ui/core/Button';

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
    console.log(runList)
    useEffect(() => {
        getUserRuns(userId.userId)
    }, [userId.userId])

    var totalDistance = 0

    runList.forEach(run => {
        totalDistance = run.distance + totalDistance
    })


    return (
        <div>
            <h2>Total Distance Ran: {totalDistance}</h2>
            <h1>My Run List</h1>
            <div>
                <Button
                    style={{ height: '4.5vh', margin: '1rem auto' }}
                    variant="contained"
                    onClick={() => push('/add-run')}
                >Add Run</Button>
                <PersonalRunList />
            </div>

        </div>
    )
}

export default MyRunList;