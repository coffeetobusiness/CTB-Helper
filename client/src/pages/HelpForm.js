import React, { useState } from 'react'
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import '../'


export default function HelpForm() {
    const [data,setData] = useState("")
    return(
        <div className="app">
        <div><Header/></div> 
        <div className="row App-conatiner01">
            <div className="col-6">
                <h3><i class="fas fa-hands-helping"></i> Helpo </h3>
                <div>
                    <h3 className="text">please fill the below form:)</h3>
                </div>
            <form>
                    <div class="form-row">
                        <div className="form-group col-md-6 input-line01">
                        {/* <label for="Name">Name</label> */}
                        <input type="text" class="form-control" id="inputEmail4" placeholder="Name"/>
                        </div>
                        <div class="form-group col-md-6">
                        {/* <label for="inputPassword4">Password</label> */}
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Phone"/>
                        </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        {/* <label for="inputState">State</label> */}
                        <select id="inputState" class="form-control">
                            <option selected>Location</option>
                            <option>...</option>
                        </select>
                        </div>
                        <div class="form-group col-md-6">
                        {/* <label for="inputState">State</label> */}
                        <select id="inputState" class="form-control">
                            <option selected>Category</option>
                            <option>...</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-group">
                        {/* <label for="inputAddress2">Address 2</label> */}
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Address"/>
                    </div>
                    
                    <div class="form-group">
                    <div class="form-group">
                        {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description"></textarea>
                    </div>
                    </div>
                    <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
            </form>
               
            </div>
            <div className="col" id="col-side">
                <img className="img" src=""/>
            </div>
        </div>
        </div>
    )
}