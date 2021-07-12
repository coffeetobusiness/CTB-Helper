import React, {useState} from 'react'
import Header from '../header/Header';
import { useHistory } from 'react-router';
import { handleErrors } from './Login';


export default function HelpForm() {

    const [title,setTitle] = useState("");
    const [phone,setPhone] = useState("");
    const [location,setLocation] = useState("");
    const [category,setCategory] = useState("");
    const [address,setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state,setState] = useState("");
    const [description,setDescription] = useState("");

    const [error, setError] = useState("");

    const PostHelpClick =(e) =>{
        e.preventDefault();
        fetch(`http://localhost:4000/users/help`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title, phone, location, category ,address, city, state, description
              }),
        })
        .then(handleErrors)
        .then(() => {
            alert("Your Post successfully added")
            history.push('/home')
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
            <div className="col-8">
                <h3><i class="fas fa-hands-helping"></i> Helpo </h3>
                <div>
                    <h3 className="text">Post  Help</h3>
                </div>
            <form onSubmit={PostHelpClick}>
                    <div class="form-row">
                        <div className="form-group col-md-6 input-line01">
                        <input required type="text" class="form-control" placeholder="Title of help" onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div class="form-group col-md-6">
                        <input  type="number" class="form-control"  placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <select  class="form-control" onChange={(e) => setLocation(e.target.value)}>
                            <option selected>Location</option>
                            <option>...</option>
                        </select>
                        </div>
                        <div class="form-group col-md-6">
                        <select  class="form-control" onChange={(e) => setCategory(e.target.value)}>
                            <option selected>Category</option>
                            <option>Medical</option>
                            <option>Financial</option>
                            <option>Food</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <select  class="form-control" onChange={(e) => setCity(e.target.value)}>
                            <option selected>City</option>
                            <option>jabalpur</option>
                            <option>Narsinghpur</option>
                            <option>pune</option>
                            <option>mumbai</option>
                        </select>
                        </div>
                        <div class="form-group col-md-6">
                        <select  class="form-control" onChange={(e) => setState(e.target.value)}>
                            <option selected>State</option>
                            <option>M.P.</option>
                            <option>U.P.</option>
                            <option>A.P.</option>
                        </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                    <div class="form-group">
                        <textarea required class="form-control"  rows="3" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    </div>
                    {error && <span id="reg-msg" >{error}</span>}
                    <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
            </form>
               
            </div>
           
        </div>
        </div>
    )
}