import React, {useState} from 'react'
import Header from '../header/Header';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function VolunteerForm() {

    const [loading,setloading] = useState(false);

    const [phone,setPhone] = useState("");
   
    const [address,setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state,setState] = useState(null);
    const [country,setCountry] = useState(null);
    const [description,setDescription] = useState(null);

    const [selectedFile, setselectedFile] = useState(null);
   

    const [error, setError] = useState("");
    

    const PostClick =(e) =>{
      e.preventDefault();

      const data = new FormData();
      if ( selectedFile ){
        setloading(true);

        data.append( 'Image', selectedFile, selectedFile.name )
        data.append( 'phone',  phone)
        data.append( 'address',  address)
        data.append( 'city',  city)
        data.append( 'state',  state)
        data.append( 'country',  country)
        data.append( 'description',  description)
      }

      axios({
        method: 'POST',
        headers:{
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
            "x-access-token": localStorage.getItem("token"),
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        },
        url: 'http://localhost:4000/users/volunteer',
        data
      })
      .then(() => {
          alert("Your request for volunteer is submitted successfully, our team verify your details and notify you by your email")
          history.push('/home')
      })
      .catch((error) =>{
          setError(error.message);
      });

      setTimeout(() => {
        setloading(false);
      }, 15000);

  };
  const history = useHistory();

  const  Imagechange = (e) =>{
      console.log(e.target.files[0])
      if (e.target.files && e.target.files[0]) {
        var img = document.getElementById("myCardImg");
        img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
       
        setselectedFile(e.target.files[0])
    }
  }
//   const  Photochange = (e) =>{
//     console.log(e.target.files[0])
//     if (e.target.files && e.target.files[0]) {
//       var img = document.getElementById("myUserImg");
//       img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
     
//       const fileUrl = URL.createObjectURL(e.target.files[0]);
//       setUserImage(fileUrl);
//   }
// }

   
    return(
        <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner">
            <div className="col-8">
                <h3><i class="fas fa-hands-helping"></i> Helpo </h3>
                <div>
                    <h3 className="text">Request For Volunteer</h3>
                </div>
            <form onSubmit={PostClick}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <input required minLength="10" type="number" class="form-control"  placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                    </div>
                
                    <div class="form-row">
                        <div class="form-group col-md-8">
                          
                             <input required type="text" onChange={(e) => setAddress(e.target.value)} value={address} class="form-control" placeholder="Address" />
                         
                        </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-4">
                        <input required placeholder="City" value={city} class="form-control" onChange={(e) => setCity(e.target.value)}/>
                           
                        </div>
                        <div class="form-group col-md-4">
                        <input required placeholder="State" value={state} class="form-control" onChange={(e) => setState(e.target.value)}/>
                            
                        </div>
                        <div class="form-group col-md-4">
                        <input required placeholder="Country" value={country}  class="form-control" onChange={(e) => setCountry(e.target.value)}/>
                           
                        </div>
                    </div>
                    
                    <div class="form-group">
                    <div class="form-group">
                        <textarea required class="form-control"  rows="3" placeholder="Describe yourself" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    </div>
                    <h5>Upload your photo in profile if not updated</h5>
                     {/* <input required type="file" className="mb-3" onChange={Photochange}></input> */}
                    <Link  to="/profilephoto" className="btn btn-primary mb-3">Change Profile Photo</Link>

                    <h5>Upload photo of your Registered Identity</h5> <input required type="file"  onChange={Imagechange}></input>
                    <br/><small className="mb-3 text-secondary">image should be less than 2mb and only jpg,jpeg,gif,png accepted</small>
                    {error && <span id="reg-msg" >{error}</span>}
                    
                    {loading && selectedFile && <button type="submit" className="btn btn-primary btn-lg btn-block"><i class="fa fa-spinner fa-spin"></i> Please Wait</button>}
                
                    {!loading && selectedFile && <button type="submit" className="btn btn-primary btn-lg btn-block">Submit Request</button>}
            </form>
               
            </div>
            <div className="col">
              {/* <img src="" alt=" " height="250px" width="250px"  id="myUserImg" ></img><hr/> */}
              <img src=" " alt="  " height="350px" width="250px"  id="myCardImg" ></img>
            </div>
        </div>
        </div>
    )
}