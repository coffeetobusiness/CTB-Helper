import React,{ useState,useEffect } from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import './App.scss';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Home from './componnents/HomeMain';
import ProtectedRoute from './ProtectedRoute';
import Newpassword from './pages/Newpassword';
import VerifyMail from './pages/VerifyMail';
import HelpForm from './componnents/HelpForm';
import VolunteerForm from './componnents/VolunteerForm';
import Profile from './componnents/Profile/Profile';
import ProfilePhoto from './componnents/Profile/ProfilePhoto';

export const CredentialsContext = React.createContext(null);///////////////:  null karna hai

function App() {
  const credentialsState = useState('');///////////////:  null karna hai

  return (
    <div className="main">
      <CredentialsContext.Provider value={credentialsState}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/reset">
            <Reset/>
          </Route>
          <Route exact path="/reset/:token">
            <Newpassword/>
          </Route>
          <Route exact path="/verify/:token">
            <VerifyMail/>
          </Route>
        </Switch>

        <ProtectedRoute path="/home" component={Home}/>
        <ProtectedRoute path="/helpform" component={HelpForm}/>
        <ProtectedRoute path="/volunteerform" component={VolunteerForm}/>
        {/* <ProtectedRoute path="/profile" component={Profile}/> */}
        {/* <ProtectedRoute path="/profilephoto" component={ProfilePhoto}/> */}
        
      </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
