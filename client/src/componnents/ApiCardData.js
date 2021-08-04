import React,{useState,useEffect} from 'react';
import { Link,  } from "react-router-dom";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import { Button } from '@material-ui/core';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { getPosts,likePost } from '../redux/actions/posts';
import Popup from './popup/Popup';


export default function ApiCardData(){
  const [show,setShow] = useState(false)
  const [currentId,setCurrentId] = useState("")
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)
  console.log(posts)



  useEffect(() => {
    console.log("i was in use effect")
    dispatch(getPosts());
  },[]);



  

    return(<>
        <div>
          {posts.map((help,index) => (
            <div className="card">
                <div className="card-body" key={help._id}>
                <h5 className="card-title">{help.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{help.city},{help.time},{help.date}</h6>
                <p className="card-text">{help.description}</p>
                <a href='mailto:uditmehra80@gmail.com' className="card-link">Contact</a>
                <a href="/" className="card-link">Share</a>
                <br></br>
                <div>
                  <Button onClick={()=>dispatch(likePost(help._id))}>
                    <ThumbUpAltIcon />
                  </Button>
                  <span>{help.likes.length}</span>

                  <Button onClick={()=>{setCurrentId(help._id);setShow(!show)}}>
                    <CommentIcon />
                  </Button>
                  <span>{help.comment.length}</span>
                </div>
                <br></br>
                <Popup  
                  show={show}
                  setShow={setShow}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
            </div>
          </div>
      ))}
    </div>
  </>
)
}
