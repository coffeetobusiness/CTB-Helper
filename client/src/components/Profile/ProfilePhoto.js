import React,{useState} from 'react';
import Header from '../../header/Header';
import { useHistory } from 'react-router';
import axios from 'axios';

 const ProfilePhoto = () =>{

  const [loading,setloading] = useState(false);

    const DefaultAvtar = "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/104113705/original/6076831db34315e45bd2a31a9d79bb7b91d48e04/design-flat-style-minimalist-avatar-of-you.jpg";
    const [image] = useState(DefaultAvtar);
    const [error, setError] = useState("");
    const hiddenFileInput = React.useRef();
    const history = useHistory();

    const [selectedFile, setselectedFile] = useState(null);

    const  Imagechange = (e) =>{
      setselectedFile(e.target.files[0])
      
        console.log(e.target.files[0])
        if (e.target.files && e.target.files[0]) {
          var img = document.getElementById("myImg");
          img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
      }
    }

    const SubmitPhoto = () =>{
        if(selectedFile==null){
            setError("Please Select a file")
        }else{

          setloading(true);

             const data = new FormData();// If file selected
            if ( selectedFile ) {data.append( 'Image', selectedFile, selectedFile.name );
              axios.post( 'http://localhost:4000/users/profilephoto', data, {
              headers: {
               'accept': 'application/json',
               'Accept-Language': 'en-US,en;q=0.8',
               'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
               "x-access-token": localStorage.getItem("token"),
              }
             })
              .then( ( response ) => {if ( 200 === response.status ) {
                // If file size is larger than expected.
                if( response.data.error ) {
                 if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                  alert( 'Max size: 2MB');
                 } else {
                  console.log( response.data );// If not the given file type
                  alert( "only jpg,jpeg,gif,png accepted");
                 }
                } else {
                 // Success
                // alert( 'Profile Photo Uploaded');
                 history.push('/profile')

                 
                //  let fileName = response.data;
                //  console.log( 'fileName', fileName );
                }
               }
              })
              .catch( ( error ) => {
              // If another error
              alert( 'image size should be less than 2Mb and jpg,jpeg,gif,png accepted');
             });

             setTimeout(() => {
              setloading(false);
            }, 15000);

            } else {
             // if file not selected throw error
             alert( 'Please upload file');
            }
    }}
    

    return(
        <div className="">
           <Header/>
           <div className="App-conatiner zoomEffect">
           <div >
           <div className=" ">
           <div className="card ">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src={image} alt=".."  id="myImg" className="rounded-circle" width="250" height="250"/>
                <span className="text-danger">{error}</span>
                <div className="mt-2">
                  <input type="file" onChange={Imagechange} ref={hiddenFileInput} style={{display: 'none'}}/>
                  <button className="btn btn-primary" onClick={(e)=>hiddenFileInput.current.click()}>Select a new photo</button>

                    
                {loading && <button type="submit" className="btn btn-success ml-5"><i class="fa fa-spinner fa-spin"></i> Uploading...</button>}
                {!loading && <button className="btn btn-success ml-5" onClick={SubmitPhoto}>Upload</button>}
                
                </div>
              </div>
            </div>
           </div>
           </div>
           </div>
           </div>
        </div>
    )
}
export default  ProfilePhoto;

// if ( selectedFile ){
//   data.append( 'Image', selectedFile, selectedFile.name )
//   data.append( 'title',  title)
//   data.append( 'phone',  phone)
//   data.append( 'location',  location)
//   data.append( 'latitude',  latitude)
//   data.append( 'longitude',  longitude)
//   data.append( 'category',  category)
//   data.append( 'address',  address)
//   data.append( 'city',  city)
//   data.append( 'state',  state)
//   data.append( 'country',  country)
//   data.append( 'description',  description)
// }

// axios({
//   method: 'POST',
//   headers:{
//     'accept': 'application/json',
//     'Accept-Language': 'en-US,en;q=0.8',
//       "x-access-token": localStorage.getItem("token"),
//       'Content-Type': `multipart/form-data; boundary=${data._boundary}`
//   },
//   url: 'http://localhost:4000/users/help',
//   data
// })