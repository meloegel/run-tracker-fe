import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './styles/sass/index.scss';

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
                <NavLink className='nav' to='/'>Home</NavLink>
                <NavLink className='nav' to='/register'>Register</NavLink>
                <NavLink className='nav' to='/login'>Sign In</NavLink>
                <NavLink onClick={handleOnClick} className='nav' to='/my-run-list'>My Run List</NavLink>
                <NavLink onClick={handleOnClick} className='nav' to='/account'>Account Settings</NavLink>
                <NavLink className='nav' to='/' onClick={handleLogout}>Logout</NavLink>
              </nav>
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
