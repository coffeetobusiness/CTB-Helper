import React,{ useContext,useEffect }  from 'react';
import {  CredentialsContext } from '../App';
import { withRouter } from 'react-router-dom';
//import './page.scss';
import Header from '../header/Header';
// <Link  to="/register">Register</Link>

function Home(){

    const [ credentials, ] = useContext(CredentialsContext)
    

  

    useEffect(() => {
        fetch(`http://localhost:4000/users/home`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
            Authorization: `Basic ${credentials.email}`,
          },
        })
          .then((response) => response.json("auth done"))
      });

    return(
        <div className="app">
          <div><Header/></div> 
          
          <h1>Welcome back... {credentials.email}</h1>

       </div>
    )
}
export default  withRouter(Home);