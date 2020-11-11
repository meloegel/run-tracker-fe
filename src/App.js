import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './styles/sass/index.scss';

import UserContext from './contexts/UserContext';
import RunTrackerContext from './contexts/RunTrackerContext';

import PrivateRoute from './utils/PrivateRoute';

import Registration from './components/Registration';
import Login from './components/Login';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import AddRun from './components/AddRun';
import MyRunList from './components/MyRunList';

function App() {
  const [runList, setRunList] = useState([]);
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState({
    userId: window.localStorage.getItem('userId')
  });

  const handleLogout = () => {
    localStorage.clear();
    SetIsLoggedIn(false);
    setUserId('');
  }

  return (
    <Router>
      <RunTrackerContext.Provider value={{ runList, setRunList }}>
        <UserContext.Provider value={{ userId, setUserId }}>
          <div className="App">
            <nav>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/register'>Register</NavLink>
              <NavLink to='/login'>Sign In</NavLink>
              <NavLink to='/my-run-list'>My Run List</NavLink>
              <NavLink to='/account'>Account Settings</NavLink>
              <NavLink to='/' onClick={handleLogout}>Logout</NavLink>
            </nav>
            <div>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/register' component={Registration} />
                <Route path='/login' component={Login} />
                <PrivateRoute path='/account' component={UserProfile} />
                <PrivateRoute path='/add-run' component={AddRun} />
                <PrivateRoute path='/my-run-list' component={MyRunList} />
              </Switch>
            </div>
          </div>
        </UserContext.Provider>
      </RunTrackerContext.Provider>
    </Router>
  );
}

export default App;
