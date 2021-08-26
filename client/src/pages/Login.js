import React,{ useState,useContext } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { signin } from '../redux/actions/auth';
import { Link  } from "react-router-dom";
import Header from '../header/Header';
import { CredentialsContext } from "../App";
import LoginImg from '../../src/login.svg';


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
    const [showPassword,setShowPassword] = useState(false)
    const [error, setError] = useState("");

    
   

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(postData)
        setCredentials(
            {postData}
          );
        dispatch(signin(postData,history))     
        // history.push("/register")          
          
      };

    // return(
    //     <div className="app">
    //     <div><Header/></div> 
    //     <div className="row App-conatiner">
    //         <div className="col-6 container-fluid">
    //            <form onSubmit={handleSubmit}>

    //             <h3><i class="fas fa-hands-helping"></i> Helpo LogIn</h3>
               
    //             <p className=" mt-5">
    //                 New User?? <Link  to="/register">Register</Link>
    //             </p>
                
    //             <div className="form-group">
    //                 <input required type="email" className="form-control input-line" placeholder="email" value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })}/>
    //             </div>

    //             <div className="form-group">
    //                 <input required minLength="5" type="password" className="form-control input-line" placeholder="password" value={postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })}/>
    //             </div>

    //             <div className="form-group">
    //                 <div className="custom-control custom-checkbox">
    //                     <input type="checkbox" className="custom-control-input" id="customCheck1" />
    //                 </div>
    //             </div>

    //             <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>

    //             {/* {error && <span id="reg-msg" >{error}</span>} */}

    //             <p className="forgot-password text-right">
    //                 Forgot <Link  to="/reset">password</Link>
    //             </p>
    //         </form>
    //         </div>
    //         <div className="col" >
    //         </div>
    //     </div>
    //     </div>
    // )



    return(
        <div className="background">
            <div className="container">
            <div className="base-container">
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <div className="header">Welcome Back</div>

                            <div className="image">
                                <img src={LoginImg} />
                            </div>
                            <div className="form">
                                <div className="form-group">
                                    {/* <label htmlFor="username">Username</label> */}
                                        <input required type="email" className="form-control input-line" placeholder="username" value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })}/>
                                </div>
                                <div className="form-group">
                                        {/* <label htmlFor="password">Password</label> */}
                                        <input required minLength="5"  type={showPassword===true?"text":"password"} className="form-control input-line" aria-describedby="basic-addon2" placeholder="password" value={postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })}/>
                                    <span>
                                        <i class="fas fa-eye" onClick={(e)=>setShowPassword(!showPassword)}></i>
                                    </span>
                                </div>   
                                
                            </div>
                            <div className="footer">
                                <button type="submit" className="btn">
                                    Login
                                </button>
                            </div>
                            <div className="error">
                                {error && <span id="reg-msg" >{error}</span>}
                            </div>
                            <div className="password">
                                <p>forgot your password?<Link  to="/reset">Reset password</Link></p>
                            </div>
                            <div className="account">
                                {/* <p>-------------------or-------------------</p> */}
                                <p>or</p>
                            </div>
                            <div className="account">
                                <p><Link  to="/register">Create New Account</Link></p>
                            </div>
                    </div> 
                </form>
            </div>
            {/* <div className="base-container2">
            </div> */}
            
        </div>
        </div>
    )

}