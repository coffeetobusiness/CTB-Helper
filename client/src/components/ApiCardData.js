import React,{useState,useEffect} from 'react';
import { Link,  } from "react-router-dom";

export default function ApiCardData({filterSearch,setFilterSearch,}){

  const [result, setresult] = useState([]);

  const LoadData =() =>{
    fetch('http://localhost:4000/users/help')
    .then(response => response.json())
    .then(data => 
      setresult(data));  
      console.log(result)
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
            data.date.toLowerCase().includes(filterSearch.toLowerCase())
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
        <div className="card">
        <div className="card-body" key={help._id}>
            <button type="button" className="ml-2 mb-1 close text-danger">
               <span >&times;</span>
            </button>
          <h5 className="card-title">{help.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{help.city} {help.country},{help.time},{help.date}</h6>
          <p className="card-text">{help.description}</p>
          <a href='mailto:uditmehra80@gmail.com' className="card-link">Contact</a>
          <a href="/" className="card-link">Share</a>
        </div>
    </div>
      ))}
        </div>
        </>
    )
  }