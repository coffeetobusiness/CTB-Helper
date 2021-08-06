import React,{ useState}  from 'react';

import { useHistory } from 'react-router';


function MakeAdmin(){


    const [UserRole] = "Admin"
    const [Verify_Role] = useState(true);

    const [error, setError] = useState("");

    const PostData = ()=>{
        console.log(error)
    
      fetch('http://localhost:4000/users/adminme',{
          method:"POST",
          headers:{
              "Content-Type":"application/json",
              "x-access-token": localStorage.getItem("token"),
          },
          body:JSON.stringify({
              UserRole,Verify_Role
          })
      })
      .then(res=>res.json())
      .then((data) => {
          if(data.error){
              setError(data.error)
           }
           else{
              alert("You Are Admin Now")
              console.log(data.message)
               history.push('/home')
           }
      })
      .catch(error=>{
          console.log(error)
      })
  }
  const history = useHistory()

    return(
        <div className="mt-2">
         
         <button type="submit" onClick={PostData} className="btn btn-secondary ">Make me Admin</button><small className="text-danger">(Temporary button)</small>
            
        </div>
    )
}
export default  MakeAdmin;