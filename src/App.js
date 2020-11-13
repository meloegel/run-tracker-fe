import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './styles/sass/index.scss';
import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';

import UserContext from './contexts/UserContext';
import RunTrackerContext from './contexts/RunTrackerContext';
import RunContext from './contexts/RunContext';

import PrivateRoute from './utils/PrivateRoute';

import Registration from './components/profile/Registration';
import Login from './components/profile/Login';
import HomePage from './components/home-page/HomePage';
import UserProfile from './components/profile/UserProfile';
import AddRun from './components/my-run-list/AddRun';
import MyRunList from './components/my-run-list/MyRunList';
import EditRun from './components/my-run-list/EditRun';

function App() {
  const [runList, setRunList] = useState([]);
  const [runInfo, setRunInfo] = useState()
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState({
    userId: window.localStorage.getItem('userId')
  });

  const handleLogout = () => {
    if (userId.userId == null) {
      handleAlert()
    } else {
      localStorage.clear();
      window.location.reload()
      SetIsLoggedIn(false);
      setUserId('');
    }
  }

  const handleOnClick = () => {
    if (userId.userId == null) {
      handleAlert()
    }
  }

  const handleAlert = () => {
    window.alert('You need to be logged in to do that')
  }

  return (
    <Router>
      <RunTrackerContext.Provider value={{ runList, setRunList }}>
        <UserContext.Provider value={{ userId, setUserId }}>
          <RunContext.Provider value={{ runInfo, setRunInfo }}>
            <div className="App">
              <nav>
                <NavLink className='nav' to='/'>Run Tracker</NavLink>
                <NavLink
                  onClick={handleOnClick}
                  className='nav'
                  to='/my-run-list'>My Run List</NavLink>
                <NavLink
                  onClick={handleOnClick}
                  className='nav'
                  to='/account'>Account Settings</NavLink>
                <NavLink className='nav' to='/' onClick={handleLogout}>Logout</NavLink>
              </nav>
              <div className='aboutPopup'>
                <Popup trigger={
                  <Button
                    id='aboutButton'
                    style={{ height: '4.5vh' }}
                    variant="contained"
                    className="button"> About </Button>} modal>
                  {close => (
                    <div className="modal">
                      <div className="aboutTitle"> About Run Tracker </div>
                      <div>
                        <p className='aboutPopupContent'> Run Tracker was created by Mark Loegel. Mark created Run Tracker because he has a passion for running as well as programming. Run Tracker keeps track of your run times and you able to post good runs to a main feed. Creating an account allows you to view your runs, edit and delete your runs and edit your profile. Thank you for using Run Tracker and Just Keep Running! </p>
                        <p><a className='gitHubLink' href='https://github.com/meloegel/run-tracker-fe'>GitHub Link</a></p>
                      </div>
                      <div className="buttonPopup">
                        <Button
                          style={{ height: '4.5vh' }}
                          variant="contained"
                          onClick={() => { close(); }}
                        >Close</Button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
              <div>
                <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route path='/register' component={Registration} />
                  <Route path='/login' component={Login} />
                  <PrivateRoute path='/account' component={UserProfile} />
                  <PrivateRoute path='/add-run' component={AddRun} />
                  <PrivateRoute path='/my-run-list' component={MyRunList} />
                  <PrivateRoute path='/edit-run/:id' component={EditRun} />
                </Switch>
              </div>
            </div>
          </RunContext.Provider>
        </UserContext.Provider>
      </RunTrackerContext.Provider>
    </Router>
  );
}

export default App;
