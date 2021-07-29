import React, {useState} from 'react'
import Header from '../header/Header';
import { useHistory } from 'react-router';
import { handleErrors } from './Login';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/actions/posts';


export default function HelpForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [postData, setPostData] = useState({ title: '', phone: '', location: '', category: '', address: '',city:'',state:'',description:'' });
    
    const [error, setError] = useState(""); 

    const PostHelpClick = async (e) => {
        e.preventDefault();

        dispatch(createPost(postData))
        .then(() => {
                    // alert("Your Post successfully added")
                    history.push('/home')
        })
    }
   
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
}