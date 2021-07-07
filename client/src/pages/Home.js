import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../constants/actionTypes';

import Header from '../header/Header';
export default function Home(){
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/');

    // setUser(null);
  };
  console.log()

  useEffect(() => {

     setUser(JSON.parse(localStorage.getItem('profile')));
     console.log(user)

  }, [location]);

    
    return(
        <div className="app">
        <div><Header/></div> 
        <h1>Welcome</h1>
        {user? (
          <div>
            <p>{user.result.firstName}</p>
            <button variant="contained"color="secondary" onClick={logout}>Logout</button>
          </div>
        ) : ""
        }

        </div>
       
      
    )
}