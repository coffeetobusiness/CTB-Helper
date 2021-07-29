import React,{ useState,useContext,useEffect }  from 'react';
import {  CredentialsContext } from '../App';
import { withRouter } from 'react-router-dom';
import Header from '../header/Header';
import HomeMain from '../components/HomeMain';
// <Link  to="/register">Register</Link>


function Home(){

    const [ credentials, ] = useContext(CredentialsContext)
    const [error, setError] = useState("");
    const email = credentials.email;

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
          <div>
            <HomeMain/>
          </div>
       </div>
    )
}
export default  withRouter(Home);