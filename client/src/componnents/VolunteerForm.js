import React, {useState ,useEffect} from 'react'
import Header from '../header/Header';
import { useHistory } from 'react-router';
import { handleErrors } from '../pages/Login';
import { useDispatch } from 'react-redux';
import { createVolunteer } from '../redux/actions/posts';


export default function VolunteerForm() {

    const [phone,setPhone] = useState("");
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ phone: '', image: '', userImage: '', country: '', address: '',city:'',state:'',description:'' });


    const [error, setError] = useState("");
    

    const PostClick =(e) =>{
      e.preventDefault();
    
    dispatch(createVolunteer(postData))
    //   .then(handleErrors)
      .then(() => {
          alert("Your request for volunteer is submitted successfully, our team verify your details and notify you by your email")
          history.push('/home')
      })
      .catch((error) =>{
          setError(error.message);
      });
  };
  const history = useHistory();

  const  Imagechange = (e) =>{
      console.log(e.target.files[0])
      if (e.target.files && e.target.files[0]) {
        var img = document.getElementById("myCardImg");
        img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
       
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        setPostData({...postData,image:fileUrl})
    }
  }
  const  Photochange = (e) =>{
    console.log(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      var img = document.getElementById("myUserImg");
      img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
     
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setPostData({...postData,userImage:fileUrl})
  }
}

   
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
                        <input required minLength="10" type="number" class="form-control"  placeholder="Phone" value={postData.phone} label="phone" name="phone" onChange={(e) => setPostData({...postData,phone:e.target.value})}/>
                        </div>
                    </div>
                
                    <div class="form-row">
                        <div class="form-group col-md-8">
                          
                             <input required type="text" value={postData.address} label="address" name="address" onChange={(e) => setPostData({...postData,address:e.target.value})} class="form-control" placeholder="Address" />
                        </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-4">
                        <input required placeholder="City" class="form-control" value={postData.city} label="city" name="city" onChange={(e) => setPostData({...postData,city:e.target.value})}/>
                           
                        </div>
                        <div class="form-group col-md-4">
                        <input required placeholder="State" class="form-control" value={postData.state} label="state" name="state" onChange={(e) => setPostData({...postData,state:e.target.value})}/>
                            
                        </div>
                        <div class="form-group col-md-4">
                        <input required placeholder="Country" class="form-control" value={postData.country} label="country" name="country" onChange={(e) => setPostData({...postData,country:e.target.value})}/>
                           
                        </div>
                    </div>
                    
                    <div class="form-group">
                    <div class="form-group">
                        <textarea required class="form-control"  rows="3" placeholder="Describe yourself" value={postData.description} label="description" name="description" onChange={(e) => setPostData({...postData,description:e.target.value})}></textarea>
                    </div>
                    </div>
                    <h5>Upload your photo</h5> <input required type="file" className="mb-3" onChange={Photochange}></input>
                    <h5>Upload photo of your Registered Identity</h5> <input required type="file" className="mb-3" onChange={Imagechange}></input>
                    {error && <span id="reg-msg" >{error}</span>}
                    
                    {postData.image && <button type="submit" className="btn btn-primary btn-lg btn-block">Submit Request</button>}
            </form>
               
            </div>
            <div className="col">
              <img src="" alt=" " height="250px" width="250px"  id="myUserImg" ></img><hr/>
              <img src="" alt=" " height="250px" width="250px"  id="myCardImg" ></img>
            </div>
        </div>
        </div>
    )
}