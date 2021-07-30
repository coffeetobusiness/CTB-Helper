import React,{useEffect,useState} from 'react';
import Header from '../../header/Header'
import { useHistory } from 'react-router';
import VerifyButton from '../../pages/VerifyMail/VerifyButton'

 const Profile = () =>{

   const history = useHistory();

    const [userData, setUserData] = useState([]);

    const [emailForVerify, setemailForVerify] = useState("");
    const [PostForVerify, setPostForVerify] = useState("");
    const [error, setError] = useState("");

    const [AllVolenteerUserData, setAllVolenteerUserData] = useState([]);

    const [PostData, setPostData] = useState([]);

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [UserRole, setUserRole] = useState('');
    const [verify_user, setverify_user] = useState('');
    const [Verify_Role, setVerify_Role] = useState('');
    const [email, setemail] = useState('');
    const [id, setid] = useState('');
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('');
    const [userImage, setuserImage] = useState('');
    const [phone, setphone] = useState('');
    

    const LoadData =() =>{
      fetch('http://localhost:4000/users/userdata',{
          method: "GET",
          headers: {
          "x-access-token": localStorage.getItem("token")
        },
      })
      .then(response => response.json())
      .then(data => setUserData(data) ||
                    setfirstName(data.firstName) ||
                    setlastName(data.lastName) ||
                    setUserRole(data.UserRole) ||
                    setverify_user(data.verify.toString()) ||
                    setVerify_Role(data.Verify_Role.toString()) ||
                    setemail(data.email) ||
                    setid(data._id) ||
                    setaddress(data.address) ||
                    setcity(data.city) ||
                    setstate(data.state) ||
                    setcountry(data.country) ||
                    setuserImage(data.userImage) ||
                    setphone(data.phone) 
                    // || console.log(data) 
            )

      fetch('http://localhost:4000/users/allvolunteeruserdata',{
            method: "GET",
            headers: {
            "x-access-token": localStorage.getItem("token")
            },
          })
        .then(response => response.json())
        .then(data => 
           setAllVolenteerUserData(data)
      );

      fetch('http://localhost:4000/users/allpost_toverify',{
            method: "GET",
            headers: {
            "x-access-token": localStorage.getItem("token")
            },
          })
        .then(response => response.json())
        .then(data => 
          console.log(data) || setPostData(data)
      );

    }
    
     useEffect(() =>{
       LoadData();
     }, []);

    const CardProfile = () =>{
       return(
        <div className="row  container-fluid">
        <div className="col-md-4 ">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src={userImage} alt="Admin" className="rounded-circle" width="150" height="150"/>
                <div className="mt-2">
                  <h4>{firstName} {lastName}</h4> {verify_user =='false' && <i className='fa fa-exclamation-circle text-warning'>Verify your email</i>}{verify_user =='true' && <i className='fa fa-check-circle text-success'></i>}
                  <p className="text-primary mb-1">{UserRole} ({Verify_Role})</p>
                  <p className="text-muted font-size-sm">{city},{state},{country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
     
      
          
        <div className="col-md-8">
          <div className="card  p-1">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {firstName} {lastName}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-6 text-secondary">
                   {email}
                </div>
                <div className="col-sm-3 text-secondary">
                   {verify_user =='false' && <VerifyButton/>}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  +91 {phone}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">User Verify</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                 {verify_user}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                      {address} {city},{state},{country}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      
      const handleErrorsFind = async (response) => {
        if (!response.ok) {
          const { message } = await response.json();
          throw Error(message);
        }
        return response.json();
      };

      const VolVerifyClick = (e) =>{
        if(emailForVerify==""){
          setError("Please Select Checkbox")
        }else{
          fetch(`http://localhost:4000/users/verifyvolunteer`,
              {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
              },
              body: JSON.stringify({ emailForVerify })
          })
          .then(handleErrorsFind)
          .then(() => {
              alert('Verify Success')
              history.push("/home");
            })
          .catch((error) =>{
              setError(error.message);
          });
        }
      };
    

    const RequestedProfile = () =>{
        return(
         <>
          <h3 className="text-danger card-header">Volunteer Request</h3>
         {AllVolenteerUserData.map((user,index) => (
         <div className="card bordered text-dark bg-light mb-3 container-fluid" key={user._id}>

           <div className="form-row card-header">
             <div><h2>Verify</h2></div>
            <div className="form-group col"><input className="form-control" value={user.email} onChange={(e) => setemailForVerify(e.target.value)} type="checkbox"/></div>
            <div className="form-group col"><h6 className="text-danger">{error}</h6></div>
            <div className="form-group col"><button  onClick={VolVerifyClick} className="btn btn-success btn-block form-control">Submit</button></div>
          </div>
         <div className="row g-0">
           <div className="col-md-3">
             <img src={user.userImage} height="650px" className="img-fluid rounded-start" alt="..."/>
           </div>
           <div className="col-md-3">
             <img src={user.image} className="img-fluid rounded-start" alt="..."/>
           </div>
           <div className="col-md-6">
             <div className="card-body">
               <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                   {user.firstName} {user.lastName}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                   {user.email}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  +91 {user.phone}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">User Verify</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                 {user.verify.toString()}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Verify Role</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                {user.Verify_Role.toString()}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                      {address} <br/>{city} ,{state} ,{country}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Description</h6>
                </div>
                <div className="col-sm-9 text-secondary card-text">
                      {user.description}
                </div>
              </div>
             </div>
           </div>
         </div>
       </div>
        ))}
         </>
    )}
    
    const PostVerifyClick = (e) =>{
      if(PostForVerify==""){
        setError("Please Select Checkbox")
      }else{
        fetch(`http://localhost:4000/users/verifypostbyvolunteer`,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ PostForVerify })
        })
        .then(handleErrorsFind)
        .then(() => {
            alert('Verify Success')
            history.push("/home");
          })
        .catch((error) =>{
            setError(error.message);
        });
      }
    };
    const VerifyPost = () =>{
      return(
       <>
        <h3 className="text-danger">Post Verify Request</h3>

        {PostData.map((help,index) => (
         <div className="card bordered text-dark bg-light mb-3 container-fluid" key={help._id}>

           <div className="form-row card-header">
             <div><h2>Verify</h2></div>
            <div className="form-group col"><input className="form-control" value={help.email} onChange={(e) => setPostForVerify(e.target.value)} type="checkbox"/></div>
            <div className="form-group col"><h6 className="text-danger">{error}</h6></div>
            <div className="form-group col"><button  onClick={PostVerifyClick} className="btn btn-success btn-block form-control">Submit</button></div>
          </div>
         <div className="row g-0">
           <div className="col-md-6">
             <img src={help.image} className="img-fluid rounded-start" alt="..."/>
           </div>
           <div className="col-md-6">
             <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Title</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                   {help.title}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Category</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                   {help.category}
                </div>
              </div>
              <hr/>
               <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                   {help.firstName} {help.lastName}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                   {help.email}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  +91 {help.phone}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Post Verify</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                 {help.verify.toString()}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                      {help.address} <br/>{help.city} ,{help.state} ,{help.country}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Description</h6>
                </div>
                <div className="col-sm-9 text-secondary card-text">
                      {help.description}
                </div>
              </div>
             </div>
           </div>
         </div>
       </div>
        ))}
       </>
  )}

    if (userData =="") {
      return <div>Loading...</div>
     }

    if(UserRole=="Seeker"){
      return(
        <div >
          <Header/>

          <CardProfile/>
        </div>
      )}

    if(UserRole=="Volunteer"){
        return(
          <div >
            <Header/>

            <CardProfile/>

            <VerifyPost/>
          </div>
        )}

    if(UserRole=="Admin"){
      return(
        <div >
          <Header/>

          <CardProfile/>

          <RequestedProfile/>
        </div>
      )}
    else{
        return <div>404 Not Found</div>
      }
}
export default Profile;