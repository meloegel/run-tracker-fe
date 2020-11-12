import React, { useEffect, useContext, useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import RunTrackerContext from '../../contexts/RunTrackerContext';
import RunList from '../home-page/RunList';
import ProfileCard from '../common/ProfileCard';
import Popup from 'reactjs-popup';

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
            {userId.userId == null ?
                <div className='loginRegister'>
                    <button onClick={() => push('/register')}>Make account here!</button>
                    <p>Or</p>
                    <button onClick={() => push('/login')}>Login</button>
                </div>
                :
                <div className='homePageProfileCard'>
                    <ProfileCard />
                </div>

            }
            <div>
                <Popup trigger={
                    <button className="button"> About </button>} modal>
                    {close => (
                        <div className="modal">
                            <a className="close" onClick={close}>&times;</a>
                            <div className="aboutTitle"> About Run Tracker </div>
                            <div className="aboutPopupDiv">
                                <p className='aboutPopupContent'> About Run Tracker content </p>
                            </div>
                            <div className="buttonPopup">
                                <button onClick={() => { close(); }}>Close</button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
            <h1>Run Tracker</h1>
            <div>
                <RunList />
            </div>
        </div>
    )
}

export default HomePage;