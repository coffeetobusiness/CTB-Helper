import React,{ useState} from 'react';
import axios from 'axios';
import $ from 'jquery';


export default function AWS(){

    const [selectedFile, setselectedFile] = useState(null);

    console.log(selectedFile);

    const singleFileUploadHandler =(e) =>{
            const data = new FormData();// If file selected
            if ( selectedFile ) {data.append( 'Image', selectedFile, selectedFile.name );
              axios.post( 'http://localhost:4000/users/img-upload', data, {
              headers: {
               'accept': 'application/json',
               'Accept-Language': 'en-US,en;q=0.8',
               'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              }
             })
              .then( ( response ) => {if ( 200 === response.status ) {
                // If file size is larger than expected.
                if( response.data.error ) {
                 if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                  alert( 'Max size: 2MB');
                 } else {
                  console.log( response.data );// If not the given file type
                  alert( response.data.error);
                 }
                } else {
                 // Success
                 let fileName = response.data;
                 console.log( 'fileName', fileName );
                 alert( 'File Uploaded');
                }
               }
              }).catch( ( error ) => {
              // If another error
              alert( error, 'red' );
             });
            } else {
             // if file not selected throw error
             alert( 'Please upload file', 'red' );
            }
    }
   

    return(
        <div className="container">
            <div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
      <div className="card-header">
       <h3 style={{ color: '#555', marginLeft: '12px' }}>Single Image Upload</h3>
       <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
      </div>
      <div className="card-body">
       <p className="card-text">Please upload an image for your profile</p>
       <input type="file" onChange={(e) => setselectedFile(e.target.files[0])}/>
       <div className="mt-5">
        <button className="btn btn-info" onClick={singleFileUploadHandler}>Upload!</button>
       </div>
      </div>
        </div>
        </div>
    )
}