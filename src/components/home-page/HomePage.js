import React, { useEffect, useContext, useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import RunTrackerContext from '../../contexts/RunTrackerContext';
import RunList from '../home-page/RunList';
import ProfileCard from '../common/ProfileCard';
import Button from '@material-ui/core/Button';

const HomePage = () => {
    const { push } = useHistory();
    const { setRunList } = useContext(RunTrackerContext);
    const [userId, setUserId] = useState({
        userId: window.localStorage.getItem('userId')
    });

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
            <div className='homePageBanner'>
                {userId.userId == null ?
                    <div className='loginRegister'>
                        <Button
                            style={{ height: '4.5vh' }}
                            variant="contained"
                            onClick={() => push('/register')}
                        >Make account here!</Button>
                        <p >---</p>
                        <Button
                            style={{ height: '4.5vh' }}
                            variant="contained"
                            size='small'
                            onClick={() => push('/login')}
                        >Login</Button>
                    </div>
                    :
                    <div className='profileCard'>
                        <div>
                            <ProfileCard />
                        </div>
                    </div>
                }
            </div>
            <h1>Run Tracker</h1>
            <div>
                <RunList />
            </div>
            <Button
                style={{ height: '4.5vh' }}
                variant="contained"
                size='small'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >To top</Button>
        </div>
    )
}

export default HomePage;