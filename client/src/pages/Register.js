import React from 'react';
//import './page.scss';
import { Link  } from "react-router-dom";
import Header from '../header/Header';
// <Link  to="/register">Register</Link>
export default function Register(){
    return(
        <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner">
            <div className="col-6">
               <form>

                <h3><i class="fas fa-hands-helping"></i> Helpo Register</h3>
                
                

                <div className="form-group mt-5">
                    <input type="text" className="form-control input-line" placeholder="name" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control input-line" placeholder="username" />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control input-line" placeholder="email" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control input-line" placeholder="password" />
                </div>

               

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className=" text-right">
                    Back to <Link  to="/">Login</Link>
                </p>
            </form>
            </div>
            <div className="col" id="col-side">
                
            </div>
        </div>
        </div>
    )
}