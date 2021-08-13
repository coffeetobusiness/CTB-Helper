import React,{ useState } from 'react';
import { useHistory } from 'react-router';

export default function DeleteAccount(){

    const [loading,setloading] = useState(false);
    

    const ClickDelete =(e) =>{
        

        setloading(true);
       
        fetch(`http://localhost:4000/users/removeuser`,
            {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": localStorage.getItem("token"),
            },
        })
        .then(() => {
            alert('Account deleted Successfully')
            history.push("/");
          })
        .catch((error) =>{
            console.log(error);
        });

        setTimeout(() => {
            setloading(false);
          }, 10000);
    };
        const history = useHistory();

    return(
        <div className="app mb-3">
             {loading && <button className="btn btn-secondary"><i class="fa fa-spinner fa-spin btn-block"></i> Deleting</button>}
            {!loading &&  <button onClick={() => { if (window.confirm('Are you sure you wish to delete this account?')) ClickDelete() } } className="btn btn-danger btn-block">Delete My Account</button>}
           
        </div>
    )
}