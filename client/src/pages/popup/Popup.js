import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {comment,getPosts} from '../../redux/actions/posts'
import {Modal} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { Typography, TextField, Button } from '@material-ui/core/';




export default function Popup({show,setShow,currentId}) {
  const posts = useSelector(state => state.posts)

    const handleClose = () => setShow(false);

    useEffect(() => {
        console.log("i was in use effect")
        dispatch(getPosts());
      },[]);

//COMMENT
  const [data,setData] = useState({comment:""})
  const dispatch = useDispatch()

  const comm = async (id) => {   
    if(data===""){
      console.log("entr data")
    }
    else{
      try{     
        console.log(currentId);
        console.log(data)
        console.log(id)
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
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {posts.filter(post => post._id === currentId).map((filteredPerson,index) => (
            <li>
               {filteredPerson.comment[index]}
            </li>
      ))}
        </Modal.Body>
        <Modal.Footer>
          <input required type="text" className="form-control" placeholder="add comment" value={data.comment} label="comment" name="comment" onChange={(e) => setData({...data,comment:e.target.value})}/>
          <Button variant="contained" color="primary" onClick={()=>comm(currentId)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}