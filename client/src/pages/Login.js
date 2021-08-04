import React,{ useState,useContext } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { signin } from '../redux/actions/auth';
import { Link  } from "react-router-dom";
import Header from '../header/Header';
import { CredentialsContext } from "../App";


export const handleErrors = async (response) => {
    if (!response.ok) {
      const { message } = await response.json();
      throw Error(message);
    }
    return response.json();
  };

export default function Login(){

    const dispatch = useDispatch();
    const history = useHistory();

    const [postData, setPostData] = useState({ email: '', password: '' });
    const [, setCredentials] = useContext(CredentialsContext);

    
   

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(postData)
        setCredentials(
            {postData}
          );
        dispatch(signin(postData,history))     
        // history.push("/register")          
          
      };

    return(
        <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner">
            <div className="col-6 container-fluid">
               <form onSubmit={handleSubmit}>

                <h3><i class="fas fa-hands-helping"></i> Helpo LogIn</h3>
               
                <p className=" mt-5">
                    New User?? <Link  to="/register">Register</Link>
                </p>
                
                <div className="form-group">
                    <input required type="email" className="form-control input-line" placeholder="email" value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })}/>
                </div>

                <div className="form-group">
                    <input required minLength="5" type="password" className="form-control input-line" placeholder="password" value={postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>

                {/* {error && <span id="reg-msg" >{error}</span>} */}

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