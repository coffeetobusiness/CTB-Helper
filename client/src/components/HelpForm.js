import React, {useState ,useEffect} from 'react'
import Header from '../header/Header';
import { useHistory } from 'react-router';

import axios from 'axios';


export default function HelpForm() {

  const [loading,setloading] = useState(false);

  
    const [title,setTitle] = useState("");
    const [phone,setPhone] = useState("");
    const [location,setLocation] = useState("");
    const [category,setCategory] = useState("");
    const [address,setAddress] = useState("");
    const [city, setCity] = useState("");
   // const [image, setImage] = useState("");
    const [selectedFile, setselectedFile] = useState(null);
   
    const [description,setDescription] = useState("");

    const [error, setError] = useState("");

    const API_KEY = '7c614508a6c6445cafad892b1a4d6d4d';    //opencage Api

    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);
    
    const [state,setState] = useState(null);
    const [country,setCountry] = useState(null);

  


    const PostHelpClick =(e) =>{
      e.preventDefault();

      const data = new FormData();
      if ( selectedFile ){
        data.append( 'Image', selectedFile, selectedFile.name )
        data.append( 'title',  title)
        data.append( 'phone',  phone)
        data.append( 'location',  location)
        data.append( 'latitude',  latitude)
        data.append( 'longitude',  longitude)
        data.append( 'category',  category)
        data.append( 'address',  address)
        data.append( 'city',  city)
        data.append( 'state',  state)
        data.append( 'country',  country)
        data.append( 'description',  description)
      }

     if(selectedFile){
      setloading(true);

      axios({
        method: 'POST',
        headers:{
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
            "x-access-token": localStorage.getItem("token"),
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        },
        url: 'http://localhost:4000/users/help',
        data
      })
      .then(() => {
          alert("Your Post successfully added")
          history.push('/home')
      })
      .catch((error) =>{
        setError('image should be less than 2Mb only and only jpg,jpeg,png,gif accepted');
        console.log(error.message)
      });
     }else{
       setError('Please choose a photo')
     }

     setTimeout(() => {
      setloading(false);
    }, 15000);
  };
  const history = useHistory();

    const showPosition = (position) =>{
      
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          Getaddress();
    }

    const Getlocation =() =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, HandleLocationError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    const Getaddress =() =>{
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`)
       .then(response => response.json())
       .then(data =>{
         setAddress(data.results[0].formatted)
         setCity(data.results[0].components.state_district)
         setState(data.results[0].components.state)
         setCountry(data.results[0].components.country)
       })
       .catch(error => alert(error))
    }

    const HandleLocationError =(error) =>{
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("Please Unable Location Permision")
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.")
          break;
        default:
          alert("An unknown error occurred.")
    }
  }

  const CityNameChange = (e) =>{
   
    fetch(`https://api.opencagedata.com/geocode/v1/json?key=7c614508a6c6445cafad892b1a4d6d4d&q=Frauenplan+1%2C+99423+Weimar%2C+${city}&pretty=1`)
     .then(response => response.json())
     .then(data =>{
      setLatitude(data.results[0].geometry.lat)
      setLongitude(data.results[0].geometry.lng)
     })
     .catch(error => console.log(error))
  }

  useEffect(() =>{
    CityNameChange();
    },
   //  [city]
     );

  const  Imagechange = (e) =>{
     
      
      if (e.target.files && e.target.files[0]) {
        var img = document.getElementById("myImg");
        img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
       
        setselectedFile(e.target.files[0])

    }
  }
   
    return(
        <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner zoomEffect" >
            <div data-aos="flip-down" className="col-9">
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
                        <div class="form-group col-md-12">
                        <select  class="form-control" onChange={(e) => setCategory(e.target.value)}>
                            <option selected>Category</option>
                            <option>Medical</option>
                            <option>Financial</option>
                            <option>Food</option>
                        </select>
                        </div>
                        
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-8">
                          
                             <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} class="form-control" placeholder="Address" />
                         
                        </div>
                        <div class="form-group col-md-4">
                        <select  onClick={Getlocation}  class="form-control" onChange={(e) => setLocation(e.target.value)}>
                            <option className="fa fa-home" onClick={Getlocation}>Current Location</option>
                            <option selected>Location</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-4">
                        <input placeholder="City" value={city} class="form-control" onChange={(e) => setCity(e.target.value)}/>
                           
                        </div>
                        <div class="form-group col-md-4">
                        <input placeholder="State" value={state} class="form-control" onChange={(e) => setState(e.target.value)}/>
                            
                        </div>
                        <div class="form-group col-md-4">
                        <input placeholder="Country" value={country}  class="form-control" onChange={(e) => setCountry(e.target.value)}/>
                           
                        </div>
                    </div>
                    
                    <div class="form-group">
                    <div class="form-group">
                        <textarea required class="form-control"  rows="3" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    </div>
                    <p className="text-right"><span>Upload Photo</span> <input type="file" onChange={Imagechange}></input></p>
                    
                    {error && <span id="reg-msg" >{error}</span>}

                    {loading && <button type="submit" className="btn btn-secondary btn-lg btn-block"><i class="fa fa-spinner fa-spin"></i> Please Wait</button>}
                    {!loading && <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>}
            </form>
               
            </div>
            <div data-aos="flip-down">
              <img src="https://www.autoserviceworld.com/wp-content/uploads/2018/08/deal-merger-shake-hands.jpg" alt=" "  id="myImg" ></img>
            </div>
        </div>
        </div>
    )
}