import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/auth';
import { Link } from "react-router-dom";
import Header from '../header/Header';


export default function Register(){
  const dispatch = useDispatch();
  const history = useHistory();

  const [postData, setPostData] = useState({ firstName: '', lastName: '', email: '', password: '', password2: '' });
    
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
        e.preventDefault();

        e.preventDefault();
        if(postData.password!==postData.password2){
            setError("Password does not match")
        }else{    
            console.log(postData)
            dispatch(signup(postData,history));        
            alert("You Are Register Please Login")
            history.push('/')
        } 
    };

    return(
        <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner">
            <div className="col-6">
           
               <form onSubmit={handleSubmit}>

                <h3><i class="fas fa-hands-helping"></i> Helpo Register</h3>
                
                

                <div className="form-group mt-5">
                    <input value={postData.firstName} label="firstName" name="firstName" required minLength="3" type="text" className="form-control input-line" placeholder="firstname" onChange={(e) => setPostData({ ...postData, firstName: e.target.value })}/>
                </div>
                <div className="form-group">
                    <input value={postData.lastName} name="lastName" label="lastName" required minLength="3" type="text" className="form-control input-line" placeholder="lastname" onChange={(e) => setPostData({ ...postData, lastName: e.target.value })}/>
                </div>
             
                <div className="form-group">
                    <input value={postData.email} name="email" label="email" required type="email" className="form-control input-line" placeholder="email" onChange={(e) => setPostData({ ...postData, email: e.target.value })}/>
                </div>
                <div className="form-group">
                    <input value={postData.password} name="password" label="password" required minLength="5" type="text" className="form-control input-line" placeholder="password" onChange={(e) => setPostData({ ...postData, password: e.target.value })}/>
                </div>
                <div className="form-group">
                    <input value={postData.password2} name="password2" label="password2" required minLength="5" type="text" className="form-control input-line" placeholder="confirm password" onChange={(e) => setPostData({ ...postData, password2: e.target.value })}/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                {error && <span id="reg-msg" >{error}</span>}
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