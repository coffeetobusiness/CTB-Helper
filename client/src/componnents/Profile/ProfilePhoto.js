import React,{useState,useEffect} from 'react';
import Header from '../../header/Header';
import { useHistory } from 'react-router';
import { handleErrors } from '../../pages/Login';

 const ProfilePhoto = () =>{

    const DefaultAvtar = "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/104113705/original/6076831db34315e45bd2a31a9d79bb7b91d48e04/design-flat-style-minimalist-avatar-of-you.jpg";
    const [image, setImage] = useState(DefaultAvtar);
    const [error, setError] = useState("");
    const hiddenFileInput = React.useRef();
    const history = useHistory();
    const  Imagechange = (e) =>{
        console.log(e.target.files[0])
        if (e.target.files && e.target.files[0]) {
          var img = document.getElementById("myImg");
          img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
         
          const fileUrl = URL.createObjectURL(e.target.files[0]);
          setImage(fileUrl);
      }
    }

    const SubmitPhoto = () =>{
        if(image==DefaultAvtar){
            setError("Please Select a file")
        }else{
            fetch(`http://localhost:4000/users/profilephoto`,{
          method: "POST",
          headers:{
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
             image
            }),
      })
      .then(handleErrors)
      .then(() => {
          alert("Profile successfully Updated")
          history.push('/profile')
      })
      .catch((error) =>{
          setError(error.message);
      });
        }
    }

    return(
        <div className="">
           <Header/>
           <div className="App-conatiner">
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

                  <button className="btn btn-success ml-5" onClick={SubmitPhoto}>Upload</button>
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