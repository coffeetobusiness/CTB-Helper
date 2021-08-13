import React,{useContext,useEffect }  from 'react';
import {  CredentialsContext } from '../App';
import { withRouter } from 'react-router-dom';
import Header from '../header/Header';
import HomeMain from '../components/HomeMain';
import Footer from '../Footer/Footer';
// <Link  to="/register">Register</Link>


function Home(){

    const [ credentials, ] = useContext(CredentialsContext)
    const email = credentials.email;
    console.log(email)

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
          <div>
            <Footer/>
          </div>
       </div>
    )
}
export default  withRouter(Home);