import React from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import './App.css';
import Login from './layouts/Login';
import Register from './layouts/Register';
import Reset from './layouts/Reset';
function App() {
  return (
    <div className="main">
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
