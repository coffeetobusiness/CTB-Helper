import React from 'react';
import { Link  } from "react-router-dom";
// import './header/header.scss'; //  [ITS ALSO WORKING]
// <Link  to="/register">Register</Link>
export default function Header(){
    return(
        <div>
           <nav className="navbar  navbar-expand-lg  ">
            <a className="navbar-brand" href="/"><h3><i class="fas fa-hands-helping"></i> Helpo</h3></a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
               <li className="nav-item">
                <Link className="nav-link" to={"/"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/about"}>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/contact"}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btnsign"  to={"/register"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btnsign"  to={"/helpform"}>Sign up</Link>
              </li>
            </ul>
         
            </div>
         </nav>
           
        </div>
    )
}