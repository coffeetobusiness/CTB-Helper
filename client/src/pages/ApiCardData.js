import React,{useState,useEffect} from 'react';

export default function ApiCardData({filterSearch,setFilterSearch}){

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
  }, [result]);

  let filterdata =result.filter((data) =>{
    return( data.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
            data.category.toLowerCase().includes(filterSearch.toLowerCase()) ||
            data.city.toLowerCase().includes(filterSearch.toLowerCase())
    )
   })

    return(<>
        <div>

        {filterdata.map((help,index) => (
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
        </div>
    </div>
      ))}
        </div>
        </>
    )
  }