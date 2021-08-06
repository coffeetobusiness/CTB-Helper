import React,{useState} from 'react'
import Header from '../header/Header';
import {useHistory,useParams} from 'react-router-dom'

const NewPassword  = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [error, setError] = useState("");
    const {token} = useParams()


    const PostData = (e)=>{
        e.preventDefault();
        fetch("http://localhost:4000/users/new-password",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.error){
             setError(data.error)
           }
           else{
               alert("Password Changed  Please LogIn")
               history.push('/')
           }
        })
    }

   return (
    <div className="app">
         <div><Header/></div> 
    <div className="row App-conatiner">
        <div className="col-6">
            <form onSubmit={PostData}>
               <h3><i class="fas fa-hands-helping"></i> Helpo </h3>
                <h4 className="mt-5">Update your Password</h4>
                <div className="form-group">
                    <input type="password" required className="form-control input-line"  placeholder="Enter a new password"
                     value={password} onChange={(e)=>setPasword(e.target.value)} />
                </div>
               <button type="submit" className="btn btn-success btn-lg btn-block">UPDATE PASSWORD</button>
            </form>
            {error && <span id="reg-msg" >{error}</span>}
        </div>
    </div>
    </div>
   )
}


export default NewPassword;