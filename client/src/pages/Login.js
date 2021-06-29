import React,{ useState , useContext } from 'react';
import { useHistory } from 'react-router';
import { CredentialsContext } from "../App";
//import './page.scss';
import { Link,  } from "react-router-dom";
import Header from '../header/Header';
// <Link  to="/register">Register</Link>

export const handleErrors = async (response) => {
    if (!response.ok) {
      const { message } = await response.json();
      throw Error(message);
    }
    return response.json();
  };

export default function Login(){
    const [email,setemail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const [, setCredentials] = useContext(CredentialsContext);
    const  [loginStatus, setloginStatus] = useState(false);

    const login =(e) =>{
        e.preventDefault();
        fetch(`http://localhost:4000/users/login`,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
              }),
        })
        .then(handleErrors)
        .then((response) => {
            setloginStatus(true);
            localStorage.setItem("token",response.token)
            setCredentials({
              email,
            });
            history.push("/home");
          })
        .catch((error) =>{
            setError(error.message);
        });
    };
        const history = useHistory();
       //Button
    const ClickAuth = () => {
        fetch(`http://localhost:4000/users/isUserAuth`,
        {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("token"),
              "Content-Type": "application/json",
        },
       })
       .then(handleErrors)
       .then(() => {
        history.push("/home");
        })
       .catch((error) =>{
        setError(error.message);
       });
    }

    return(
        <div className="app">
        <div><Header/></div> 

        {loginStatus && <button className="btn btn-success" onClick={ClickAuth}>Check if auth</button>}

        <div className="row App-conatiner">
            <div className="col-6 container-fluid">
               <form onSubmit={login}>

                <h3><i class="fas fa-hands-helping"></i> Helpo LogIn</h3>
               
                <p className=" mt-5">
                    New User?? <Link  to="/register">Register</Link>
                </p>
                
                <div className="form-group">
                    <input required type="email" className="form-control input-line" placeholder="email" onChange={(e) => setemail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <input required minLength="5" type="password" className="form-control input-line" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>

                {error && <span id="reg-msg" >{error}</span>}

                <p className="forgot-password text-right">
                    Forgot <Link  to="/reset">password</Link>
                </p>
            </form>
            </div>
            <div className="col" >
              
            </div>
        </div>
        </div>
    )
}