import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {comment,getPosts} from '../../redux/actions/posts'
import {Modal} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { Button } from '@material-ui/core/';




export default function Popup({show,setShow,currentId}) {
  const posts = useSelector(state => state.posts)
    const handleClose = () => setShow(false);

    useEffect(() => {
        console.log("i was in use effect")
        dispatch(getPosts());
      },[]);

  const [data,setData] = useState({comment:""})
  const dispatch = useDispatch()

//COMMENT

  const comm = async (id) => {   
    if(data===""){
      console.log("entr data")
    }
    else{
      try{            
        console.log(data)
        console.log(data.comment)
        dispatch(comment(data,id))
        setShow(!show)
        setData("")
      }
      catch(error){
        console.log(error)
      }
    }
  }

return (
    <>
      <Modal
        scrollable="true"
        show={show}
        onHide={handleClose}
        backdrop="true"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Comments</Modal.Title>
          <button onClick={()=>handleClose()} type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </Modal.Header>
        <Modal.Body>
            {posts.filter(post => post._id === currentId).map((filteredPerson,index) => (
            
              <div>
              {filteredPerson.comment.map((data,index) => (
            <ul>
              <li>
               {data}
              </li>
            </ul>
            
      ))}
            </div>
            
      ))}
        </Modal.Body>
        <Modal.Footer>
          <input required type="text" className="form-control" placeholder="add comment" value={data.comment || ""} label="comment" name="comment" onChange={(e) => setData({...data,comment:e.target.value})} />
          <Button variant="contained" color="primary" onClick={()=>comm(currentId)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}