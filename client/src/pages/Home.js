import React,{ useState,useContext,useEffect }  from 'react';
import {  CredentialsContext } from '../App';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import Header from '../header/Header';
import HomeSearch from './HomeSearch';
import HomeMain from './HomeMain'
// <Link  to="/register">Register</Link>


function Home(){

  const VerifyButton = () =>{
    return(
      <>
           <button type="submit" onClick={PostData} className="verifybtn btn btn-dark">Verify Email</button>
      </>
    )
  }
    const [ credentials, ] = useContext(CredentialsContext)
    const [error, setError] = useState("");
    const email = credentials.email;

    const PostData = (e)=>{
      e.preventDefault();
      fetch('http://localhost:4000/users/verifyclick',{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              email
          })
      })
      .then(res=>res.json())
      .then((data) => {
          if(data.error){
              setError(data.error)
           }
           else{
              alert("Please check your email")
              console.log(data.message)
               history.push('/home')
           }
      })
      .catch(error=>{
          console.log(error)
      })
  }
  const history = useHistory()

  

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
          {/* <VerifyButton/>
            <h5>Welcome back... {credentials.email}</h5> */}
         {error && <span id="reg-msg" >{error}</span>} 
          <div>
            <HomeSearch/>
          </div>
          <div>
            <HomeMain/>
          </div>
       </div>
    )
}
export default  withRouter(Home);