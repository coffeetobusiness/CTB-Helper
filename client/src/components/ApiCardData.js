import React,{useState,useEffect} from 'react';
import { Link,  } from "react-router-dom";

export default function ApiCardData({filterSearch,setFilterSearch,}){

  const [result, setresult] = useState([]);

  const LoadData =() =>{
    fetch('http://localhost:4000/users/help',{
      method: "GET",
      headers: {
      "x-access-token": localStorage.getItem("token")
    }})
    .then(response => response.json())
    .then(data => 
      setresult(data) || console.log(data));
  }
  
  useEffect(() =>{
    LoadData();
  }, []);

  let filterdata =result.filter((data) =>{
    return( data.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
            data.category.toLowerCase().includes(filterSearch.toLowerCase()) ||
            data.city.toLowerCase().includes(filterSearch.toLowerCase()) ||
            data.state.toLowerCase().includes(filterSearch.toLowerCase()) ||
            data.address.toLowerCase().includes(filterSearch.toLowerCase()) ||
            data.date.toLowerCase().includes(filterSearch.toLowerCase()) ||
            data.description.toLowerCase().includes(filterSearch.toLowerCase())
    )
   })

  const Newest = () =>{
    setresult(result.reverse())
  }

    return(<>
        <div>
        <div>
          <h5>Sort by: 
            <Link className="ml-1" >relevance</Link>
            <Link className="ml-1" onClick={Newest} >- Newest-first</Link>
            <Link className="ml"  > - Location : </Link><input onChange={(e) => setFilterSearch(e.target.value)} placeholder="e.g. - city,state" className="inputboxlocation mt-1"/>
            </h5> 
        </div>

        {filterdata.map((help,index) => (
        <div  className="card cardResponsive">
        <div className="card-body" key={help._id}>
            {/* <button type="button" className=" ml-2 mb-1 close text-danger">
               <span >&times;</span>
            </button> */}
            <span className="position-absolute tm-new-badge">New</span>
          <h5 data-aos="fade-left" className="card-title">{help.title} {help.verify === true && <i class="fas fa-check-double text-success"><small>(verified)</small></i>} {help.verify === false && <i class="fas fa-check-double text-warning"><small>(not verified)</small></i>}</h5>
          
          <h6 data-aos="fade-left" className="card-subtitle mb-2 text-muted">{help.city} {help.country},{help.time},{help.date}</h6>
          <div className="row">
            <p data-aos="fade-right" className="cardimage text-center"> <img src={help.image}  alt=" " class="cardImg card-img-top" /></p>
            <p data-aos="fade-left" className="cardDescription card-text col-6">{help.description}</p>
          </div>
          <a data-aos="fade-left" href='mailto:uditmehra80@gmail.com' className="card-link">Contact</a>
          <a data-aos="fade-left" href="/" className="card-link">Share</a>
        </div>
    </div>
      ))}
        </div>
        </>
    )
  }