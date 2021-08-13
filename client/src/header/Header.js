import React,{useContext} from 'react';
import { Link  } from "react-router-dom";
import {  CredentialsContext } from '../App';
import { useHistory } from 'react-router';
// import './header/header.scss'; //  [ITS ALSO WORKING]
// <Link  to="/register">Register</Link>
export default function Header(){
  const [ credentials,setCredentials ] = useContext(CredentialsContext)

  const history = useHistory();

  const logout =() => {
    localStorage.removeItem("token");
      //setCredentials(null);/////////////:  null karna hai
      setCredentials('');
      history.push("/");
  }
    return(
        <div>
          <nav className="navbar  navbar-expand-lg">
            <Link className="navbar-brand nav-link" href="/" to="/home"><h3><i class="fas fa-hands-helping"></i> Helpo</h3></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/home"}>Home</Link>
              </li>

              {credentials && <li className="nav-item">
                <Link className="nav-link" to={"/"}>About</Link>
              </li>}

              {credentials && <li className="nav-item">
                <Link className="nav-link" to={"#"}>Contact</Link>
              </li>}

              {credentials && <li className="nav-item">
                <Link className="nav-link" to={'/profile'}>Profile</Link>
              </li>}

              {!credentials && <li className="nav-item">
                <Link className="nav-link btnsign"  to={"/register"}>Sign up</Link>
              </li>}

              {credentials && <li className="nav-item">
                 <button className="btn btn-danger btnlogout"  onClick={logout}>Logout</button>
              </li> }
            </ul>
            
          </div>
          </nav>
         
           
        </div>
    )
}