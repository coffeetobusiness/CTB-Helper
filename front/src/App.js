import React from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Reset from './components/Reset';
function App() {
  return (
    <div className="">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
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
