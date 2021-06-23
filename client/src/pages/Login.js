import React from 'react';
//import './page.scss';
import { Link  } from "react-router-dom";
import Header from '../header/Header';
// <Link  to="/register">Register</Link>
export default function Login(){
    return(
        <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner">
            <div className="col-6 container-fluid">
               <form>

                <h3><i class="fas fa-hands-helping"></i> Helpo LogIn</h3>
                <p className=" mt-5">
                    New User?? <Link  to="/register">Register</Link>
                </p>
                

                <div className="form-group">
                    
                    <input type="email" className="form-control input-line" placeholder="Enter email" />
                </div>

                <div className="form-group ">
                   
                    <input type="password" className="form-control input-line" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
    
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