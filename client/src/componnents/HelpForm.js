import React, {useState,useEffect} from 'react'
import Header from '../header/Header';
import { useHistory } from 'react-router';
import { handleErrors } from '../pages/Login';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/actions/posts';
// import $ from 'jquery';


export default function HelpForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [postData, setPostData] = useState({data:'', title: '', phone: '', location: '', category: '', address: '',city:'',state:'',description:'',country:'',latitude:'',longitude:'' });
    
    const [error, setError] = useState(""); 

    // const [selectedFile, setselectedFile] = useState(null);


    // const API_KEY = '7c614508a6c6445cafad892b1a4d6d4d';    //opencage Api

    // const data = new FormData();
    // if ( selectedFile ) {data.append( 'Image', selectedFile, selectedFile.name )}
    // console.log(data)


    const PostHelpClick = async (e) => {
        e.preventDefault();

        dispatch(createPost(postData))
        .then(() => {
                    // alert("Your Post successfully added")
                    history.push('/home')
        })
    }

  //   const showPosition = (position) =>{
      
  //       // setLatitude(position.coords.latitude);
  //       setPostData({...postData,latitude:position.coords.latitude})
  //       // setLongitude(position.coords.longitude);
  //       setPostData({...postData,longitude:position.coords.longitude})
  //       Getaddress();
  // }

  //   const Getlocation =() =>{
  //       if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(showPosition, HandleLocationError);
  //       } else {
  //         alert("Geolocation is not supported by this browser.");
  //       }
  //     }
  
  //     const Getaddress =() =>{
  //         fetch(`https://api.opencagedata.com/geocode/v1/json?q=${postData.latitude}+${postData.longitude}&key=${API_KEY}`)
  //        .then(response => response.json())
  //        .then(data =>{
  //       //    postData.address(data.results[0].formatted)
  //          setPostData({...postData,address:data.results[0].formatted})

  //       //    postData.city(data.results[0].components.state_district)
  //          setPostData({...postData,city:data.results[0].components.state_district})

  //       //    postData.state(data.results[0].components.state)
  //          setPostData({...postData,state:data.results[0].components.state})

  //       //    postData.country(data.results[0].components.country)
  //          setPostData({...postData,country:data.results[0].components.country})

  //        })
  //        .catch(error => alert(error))
  //     }

  //     const HandleLocationError =(error) =>{
  //       switch(error.code) {
  //         case error.PERMISSION_DENIED:
  //           alert("Please Unable Location Permision")
  //           break;
  //         case error.POSITION_UNAVAILABLE:
  //           alert("Location information is unavailable.")
  //           break;
  //         case error.TIMEOUT:
  //           alert("The request to get user location timed out.")
  //           break;
  //         case error.UNKNOWN_ERROR:
  //           alert("An unknown error occurred.")
  //           break;
  //         default:
  //           alert("An unknown error occurred.")
  //     }
  //   }

  //   const CityNameChange = (e) =>{
   
  //       fetch(`https://api.opencagedata.com/geocode/v1/json?key=7c614508a6c6445cafad892b1a4d6d4d&q=Frauenplan+1%2C+99423+Weimar%2C+${postData.city}&pretty=1`)
  //        .then(response => response.json())
  //        .then(data =>{
  //       //   setLatitude(data.results[0].geometry.lat)
  //         setPostData({...postData,latitude:data.results[0].geometry.lat})
  //       //   setLongitude(data.results[0].geometry.lng)
  //         setPostData({...postData,longitude:data.results[0].geometry.lng})

  //        })
  //        .catch(error => console.log(error))
  //     }
    
  //     useEffect(() =>{
  //       CityNameChange();
  //       }, [postData.city]);
    
  //     const  Imagechange = (e) =>{
         
          
  //         if (e.target.files && e.target.files[0]) {
  //           var img = document.getElementById("myImg");
  //           img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
           
  //           const fileUrl = URL.createObjectURL(e.target.files[0]);
  //           setselectedFile(e.target.files[0])
    
  //       }
  //     }
   
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
                            <input required type="text" className="form-control" placeholder="Title of help" value={postData.title} label="title" name="title" onChange={(e) => setPostData({...postData,title:e.target.value})}/>
                        </div>
                        <div class="form-group col-md-6">
                            <input required type="number" className="form-control" placeholder="Phone" value={postData.phone} label="phone" name="phone" onChange={(e) => setPostData({...postData,phone:e.target.value})}/>
                        </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <select  className="form-control" value={postData.location} label="location" name="location" onChange={(e) => setPostData({...postData,location:e.target.value})}>
                            <option selected>Location</option>
                            <option>...</option>
                        </select>
                        </div>
                        <div class="form-group col-md-6">
                        <select  className="form-control" value={postData.category} label="category" name="category" onChange={(e) => setPostData({...postData,category:e.target.value})}>
                            <option selected>Category</option>
                            <option>Medical</option>
                            <option>Financial</option>
                            <option>Food</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <input required type="text" className="form-control" placeholder="Address" value={postData.address} label="address" name="address" onChange={(e) => setPostData({...postData,address:e.target.value})}/>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <select  className="form-control" value={postData.city} label="city" name="city" onChange={(e) => setPostData({...postData,city:e.target.value})}>
                            <option selected>City</option>
                            <option>jabalpur</option>
                            <option>Narsinghpur</option>
                            <option>pune</option>
                            <option>mumbai</option>
                        </select>
                        </div>
                        <div class="form-group col-md-6">
                        <select  className="form-control" value={postData.state} label="state" name="state" onChange={(e) => setPostData({...postData,state:e.target.value})}>
                            <option selected>State</option>
                            <option>M.P.</option>
                            <option>U.P.</option>
                            <option>A.P.</option>
                        </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                    <div class="form-group">
                        <textarea required class="form-control"  rows="3" placeholder="Description" label="description" name="description" value={postData.description} onChange={(e) => setPostData({...postData,description:e.target.value})}></textarea>
                    </div>
                    </div>
                    {error && <span id="reg-msg" >{error}</span>}
                    <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
            </form>
               
            </div>
           
        </div>
        </div>
    )



    // return(
    //     <div className="app">
    //     <div><Header/></div> 
    //     <div className="row App-conatiner">
    //         <div className="col-9">
    //             <h3><i class="fas fa-hands-helping"></i> Helpo </h3>
    //             <div>
    //                 <h3 className="text">Post  Help</h3>
    //             </div>
    //         <form onSubmit={PostHelpClick}>
    //                 <div class="form-row">
    //                     <div className="form-group col-md-6 input-line01">
    //                     <input required type="text" className="form-control" placeholder="Title of help" value={postData.title} label="title" name="title" onChange={(e) => setPostData({...postData,title:e.target.value})}/>
    //                     </div>
    //                     <div class="form-group col-md-6">
    //                         <input required type="number" className="form-control" placeholder="Phone" value={postData.phone} label="phone" name="phone" onChange={(e) => setPostData({...postData,phone:e.target.value})}/>
    //                     </div>
    //                 </div>
    //                 <div class="form-row">
    //                     <div class="form-group col-md-12">
    //                     <select  className="form-control" value={postData.category} label="category" name="category" onChange={(e) => setPostData({...postData,category:e.target.value})}>
    //                         <option selected>Category</option>
    //                         <option>Medical</option>
    //                         <option>Financial</option>
    //                         <option>Food</option>
    //                     </select>
    //                     </div>
                        
    //                 </div>
    //                 <div class="form-row">
    //                     <div class="form-group col-md-8">  
    //                         <input required type="text" className="form-control" placeholder="Address" value={postData.address} label="address" name="address" onChange={(e) => setPostData({...postData,address:e.target.value})}/>                         
    //                     </div>
    //                     <div class="form-group col-md-4">
    //                         {/* <select  onClick={Getlocation}  class="form-control" onChange={(e) => setLocation(e.target.value)}> */}
    //                         <select onClick={Getlocation} className="form-control" value={postData.location} onChange={(e) => setPostData({...postData,location:e.target.value})}>                         
    //                             <option className="fa fa-home" onClick={Getlocation}>Current Location</option>
    //                             <option selected>Location</option>
    //                         </select>
    //                     </div>
    //                 </div>
    //                 <div class="form-row">
    //                     <div class="form-group col-md-4">
    //                         <input  className="form-control" value={postData.city} label="city" name="city" onChange={(e) => setPostData({...postData,city:e.target.value})}/>
    //                     </div>
    //                     <div class="form-group col-md-4">
    //                         <input  className="form-control" value={postData.state} label="state" name="state" onChange={(e) => setPostData({...postData,state:e.target.value})}/>
    //                     </div>
    //                     <div class="form-group col-md-4">
    //                         <input  className="form-control" value={postData.country} label="country" name="country" onChange={(e) => setPostData({...postData,country:e.target.value})}/>
    //                     </div>
    //                 </div>
                    
    //                 <div class="form-group">
    //                     <div class="form-group">
    //                         <textarea required class="form-control"  rows="3" placeholder="Description"  value={postData.description} label="description" name="description" onChange={(e) => setPostData({...postData,description:e.target.value})}></textarea>
    //                     </div>
    //                 </div>
    //                 <p className="text-right"><span>Upload Photo</span> <input type="file" onChange={Imagechange}></input></p>
                    
    //                 {error && <span id="reg-msg" >{error}</span>}
    //                 <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
    //         </form>
               
    //         </div>
    //         <div className="">
    //           <img src="https://www.autoserviceworld.com/wp-content/uploads/2018/08/deal-merger-shake-hands.jpg" alt=" "  id="myImg" ></img>
    //         </div>
    //     </div>
    //     </div>
    // )
}