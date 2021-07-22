import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {comment} from '../../redux/actions/posts'
import { Modal,Button } from "react-bootstrap";


export default function Popup(props) {
    console.log(props.id)
    const [data,setData] = useState({comment:""})
    const dispatch = useDispatch()

    const like = async (id) => {
        console.log(id)
        dispatch(comment(data,id))
        props.setTrigger(false)
        // .then(()=>{
        //   dispatch(getPosts());
        // })
    }


    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {/* <input type="text" onChange={(e)=>setData(e.target.value)} /> */}
                <input required type="text" className="form-control" placeholder="add comment" value={data.comment} label="comment" name="comment" onChange={(e) => setData({...data,comment:e.target.value})}/>

                <button className="close-btn" onClick={()=>like(props.id)} >Close</button>
            </div>
        </div>
    ):""
}

// // export default Popup

// export default function Popup(props) {
//     console.log(props.id)
//     const [data,setData] = useState({comment:""})
//     const dispatch = useDispatch()

//     const like = async (id) => {
//         console.log(data)
//         console.log(id)
//         dispatch(comment(data,id))
//         props.onHide()
//     }

//     return (
//       <Modal
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Modal heading
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Comments</h4>
//           <p>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//             consectetur ac, vestibulum at eros.
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//          <input required type="text" className="form-control" placeholder="add comment" value={data.comment} label="comment" name="comment" onChange={(e) => setData({...data,comment:e.target.value})}/>
//          <Button onClick={()=>like(props.id)}>Add</Button>
//         </Modal.Footer>
//       </Modal>
//     );
  
// }