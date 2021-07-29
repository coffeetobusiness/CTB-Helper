import React,{useEffect,useState} from 'react';
import Header from '../../header/Header'

 const Profile = () =>{
   
    const [userData, setUserData] = useState([]);

    const LoadData =() =>{
      fetch('http://localhost:4000/users/userdata',{
          method: "GET",
          headers: {
          "x-access-token": localStorage.getItem("token")
        },
      })
      .then(response => response.json())
      .then(data =>
        setUserData(data));
    }
    
     useEffect(() =>{
       LoadData();
     }, []);

  

    return(
        <div>
          <Header/>
         <button onClick={LoadData}>hey Click</button>

         {userData.map((data) => (
          <div className="card" key={data._id}>
        
          <h5 className="card-title">{data.firstName}</h5>
          <h5 className="card-title">{data.lastName}</h5>
        
         </div>
        ))}

        {userData !== ""  && userData.map((data) => (
          <div className="card" key={data._id}>
        
          <h5 className="card-title">{data.firstName}</h5>
        
         </div>
        ))} 

          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>Manish mehra</h4>
                      <p className="text-secondary mb-1">Full Stack Developer</p>
                      <p className="text-muted font-size-sm">Jabalpur,madhya pradesh,India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
          
              
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Manish Mehra
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      uditmehra69@gmail.com
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      +91 9340151612
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    +91 8878759718
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        Jabalpur,madhya pradesh,India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
export default Profile;