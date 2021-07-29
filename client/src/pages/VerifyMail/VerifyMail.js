import React,{useState} from 'react'
import Header from '../../header/Header';
import {useHistory,useParams} from 'react-router-dom'

const VerifyMail  = ()=>{
    const history = useHistory()
    const [error, setError] = useState("");
    const {token} = useParams()

    const VerifyEmail = ()=>{
        fetch("http://localhost:4000/users/verify-email",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token
            })
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.error){
             setError(data.error)
           }
           else{
               alert("Verified Success")
               history.push('/')
           }
        })
    }

   return (
    <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner">
          <div className="col-8">
            <button type="submit" onClick={VerifyEmail} className="btn btn-success btn-lg btn-block">Please Click To Verify</button>
            {error && <span id="reg-msg" >{error}</span>}
          </div>
        </div>
   
    </div>
   )
}


export default VerifyMail;