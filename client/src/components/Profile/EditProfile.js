import React,{ useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import Headers from '../../header/Header'

export default function EditProfile(){

    const [loading,setloading] = useState(false);
   
   

    
    const [error, setError] = useState("");

  

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');

    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('');

    const LoadData = () =>{
        fetch('http://localhost:4000/users/userdata',{
            method: "GET",
            headers: {
            "x-access-token": localStorage.getItem("token")
          },
        })
        .then(response => response.json())
        .then(data => 
                      setfirstName(data.firstName) ||
                      setlastName(data.lastName) ||
                      setemail(data.email) ||
                      setphone(data.phone) ||

                      setaddress(data.address) ||
                      setcity(data.city) ||
                      setstate(data.state) ||
                      setcountry(data.country) ||
                      console.log(data) 
              )
    }

    useEffect(() =>{
        LoadData();
      }, []);
  
   

    const Click =(e) =>{
        
        e.preventDefault();

        setloading(true);
       
        fetch(`http://localhost:4000/users/EditProfile`,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                firstName,lastName, email,phone,address,city,state,country 
            }),
        })
        .then(() => {
            alert('Profile Updated')
            history.push("/profile");
          })
        .catch((error) =>{
            alert(error);
        });

        setTimeout(() => {
            setloading(false);
          }, 10000);
    };
        const history = useHistory();

    return(<div >
        <Headers/>
        <div className="App-conatiner zoomEffect">
        <form onSubmit={Click}>
           <div className="row"> 
          <div className="col-6">
            <div className="form-group mt-5">
                <input required minLength="3" value={firstName} type="text" className="form-control input-line" placeholder="firstname" onChange={(e) => setfirstName(e.target.value)}/>
            </div>
            <div className="form-group">
                <input required minLength="3" value={lastName} type="text" className="form-control input-line" placeholder="lastname" onChange={(e) => setlastName(e.target.value)}/>
            </div>
         
            <div className="form-group">
                <input required type="email" value={email} className="form-control input-line" placeholder="email" onChange={(e) => setemail(e.target.value)}/>
            </div>

            <div className="form-group">
                <input required type="number" value={phone} className="form-control input-line" placeholder="phone" onChange={(e) => setphone(e.target.value)}/>
            </div>
            
            {error && <span id="reg-msg" >{error}</span>}
            
          </div>
          <div className="col-6" id="col-side">
          <div className="form-group mt-5">
                <input required minLength="3" value={address} type="text" className="form-control input-line" placeholder="Address" onChange={(e) => setaddress(e.target.value)}/>
            </div>
            <div className="form-group">
                <input required minLength="3" value={city} type="text" className="form-control input-line" placeholder="City" onChange={(e) => setcity(e.target.value)}/>
            </div>
         
            <div className="form-group">
                <input required type="text" value={state} className="form-control input-line" placeholder="State" onChange={(e) => setstate(e.target.value)}/>
            </div>

            <div className="form-group">
                <input required type="text" value={country} className="form-control input-line" placeholder="Country" onChange={(e) => setcountry(e.target.value)}/>
            </div>
            
          </div>
          </div>

             {loading && <button className="btn btn-secondary btn-block"><i class="fa fa-spinner fa-spin btn-block"></i>Saving</button>}
            {!loading &&  <button type="submit"  className="btn btn-success btn-block">Save Changes</button>}
        
        </form>
        </div>
        </div>
    )
}