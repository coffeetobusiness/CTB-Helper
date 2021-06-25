import React, {useState} from 'react';
import { useHistory } from 'react-router';
//import './page.scss';
import { Link, Redirect  } from "react-router-dom";
import Header from '../header/Header';
// <Link  to="/register">Register</Link>
export default function Register(){

    const [firstName,setfirstName] = useState("");
    const [lastName,setlastName] = useState("");
    const [email,setemail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");

    const handleErrors = async (response) => {
        if (!response.ok) {
          const { message } = await response.json();
          throw Error(message);
        }
        return response.json();
      };

    const register =(e) =>{
        e.preventDefault();
        fetch(`http://localhost:4000/users/register`,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
              }),
        })
        .then(handleErrors)
        .then(() => {
           Redirect('/')
        })
        .catch((error) =>{
            setError(error.message);
        });
    };
    const history = useHistory();
    return(
        <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner">
            <div className="col-6">
            {error && <span style={{ color: "red" }}>{error}</span>}
               <form onSubmit={register}>

                <h3><i class="fas fa-hands-helping"></i> Helpo Register</h3>
                
                

                <div className="form-group mt-5">
                    <input required type="text" className="form-control input-line" placeholder="name" onChange={(e) => setfirstName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control input-line" placeholder="lastname" onChange={(e) => setlastName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control input-line" placeholder="email" onChange={(e) => setemail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control input-line" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
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