import React,{useState,useEffect} from 'react';
import { Link,  } from "react-router-dom";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import { Button } from '@material-ui/core';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { getPosts,likePost } from '../redux/actions/posts';
import Popup from './popup/Popup';

const ApiCardData =()=>{
  const [buttonPops,setButtonPops] = useState(false)
  // const [modalShow, setModalShow] = React.useState(false);

  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch()
  console.log(posts)


  useEffect(() => {
    console.log("i was in use effect")
    dispatch(getPosts());
  },[]);

  const like = async (id) => {
    dispatch(likePost(id))
    .then(()=>{
      dispatch(getPosts());
    })
  }

  

    return(<>
        <div>
        {posts.map((help,index) => (
        <div className="card">
        <div className="card-body" key={help._id}>
            <button type="button" className="ml-2 mb-1 close text-danger">
               <span >&times;</span>
            </button>
          <h5 className="card-title">{help.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{help.city},{help.time},{help.date}</h6>
          <p className="card-text">{help.description}</p>
          <a href='mailto:uditmehra80@gmail.com' className="card-link">Contact</a>
          <a href="/" className="card-link">Share</a>
          <br></br>
          <Button onClick={()=>like(help._id)}>
            <ThumbUpAltIcon />
          </Button>
          <span>{help.likes.length}</span>

          <Button onClick={()=>setButtonPops(true)}>
            <CommentIcon />
          </Button>
          <span>{help.comment.length}</span>
          <Popup trigger={buttonPops} setTrigger={setButtonPops} id={help._id}/>
          <p>{help.comment}</p>
          
          {/* <Button variant="primary" onClick={() => setModalShow(true)}>
            <CommentIcon />
          </Button>
          <span>{help.comment.length}</span>


          <Popup
            id={help._id}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          console.log({help._id}) */}
        
        </div>
    </div>
      ))}
        </div>
        </>
    )
  }
const FilterForm = () =>{
    return(
        <div>
          <form className="FilterForm mt-2">
              <h4 className="text-center text-primary"><i className="fa fa-filter"></i>Filter</h4>
              <select className="form-control">
                <option>Category</option>
                <option>...</option>
              </select>
              <select className="form-control mt-2">
                <option>Type of Help</option>
                <option>...</option>
              </select>
              <select className="form-control  mt-2">
                <option>Urgency</option>
                <option>...</option>
              </select>
              <select className="form-control  mt-2">
                <option>Location</option>
                <option>...</option>
              </select>

              <p className="text-center mt-5">
              <button type="submit" className="btn btn-success">
                  Submit
              </button>
              </p>
          </form>
        </div>
    )
}

const RightBar = () =>{
    return(
        <div className="RightBar card w-100 mt-2">
            <div className="card-header bg-secondary text-warning">
               Most Recent searches
            </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Udit</h6>
              <h6 className="card-subtitle mb-2 text-warning">Udit</h6>
              <h6 className="card-subtitle mb-2 text-danger">Udit</h6>
              <h6 className="card-subtitle mb-2 text-success">Pratik</h6>
              <h6 className="card-subtitle mb-2 text-primary">Pratik</h6>
              <h6 className="card-subtitle mb-2 text-secondary">Shantanu</h6>
            </div>
        </div>
    )
}

const Postbutton = () =>{
  return(
      <div className="mt-2">
        <Link className="btn btn-primary btn-block" to="/helpform">Post A help</Link>
      </div>
  )
}

export default function HomeMain(){
  
    return(<div className="container-fluid">
        <div className="row">
           <div className="col-2">
               <FilterForm/>
           </div>

           <div className="col-8">
               <div>
                   <h5>Sort by: 
                    <a className="ml-2" href="/home">Relavance</a>
                    <a className="ml-3" href="/home">Newest-first</a>
                    <a className="ml-3" href="/home">Nearest</a> 
                    <a className="ml-3" href="/home">Minimum-time</a>
                   </h5> 
               </div>
               <ApiCardData/>
           </div>
           <div className="col-2">
             <Postbutton/>
            <RightBar/>
            <hr></hr>
           </div>
        </div>
        </div>
    )
  }
