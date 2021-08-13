import React,{useState} from 'react';
//import './page.scss';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import Header from '../header/Header';

export default function Reset(){
   
    const [email,setEmail] = useState("");
    const [error, setError] = useState("");

    const PostData = (e)=>{
        e.preventDefault();
        fetch('http://localhost:4000/users/reset-password',{
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
                alert("Please check your email & update your password with in 60 Min")
                console.log(data.message)
                 history.push('/')
             }
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const history = useHistory()
    return(
        <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner zoomEffect">
            <div className="col-6">
               <form onSubmit={PostData}>

                <h3><i class="fas fa-hands-helping"></i> Helpo </h3>
                
                <h4 className="mt-5">Forget</h4>
                <h4>Your Password?</h4>
                <p>Enter your email to reset your password.</p>


                <div className="form-group">
                    <input type="email" required className="form-control input-line" placeholder="email"  value={email}
                     onChange={(e)=>setEmail(e.target.value)} />
                     {error && <span id="reg-msg" >{error}</span>}
                </div>
                
               
               

                <button type="submit" className="btn btn-dark btn-lg btn-block">RESET PASSWORD</button>
                <p className=" text-right mt-4">
                    Back to <Link  to="/">Login</Link>
                </p>
            </form>
            </div>
            <div className="col" >
                
            </div>
           
        </div>
        </div>
    )
}