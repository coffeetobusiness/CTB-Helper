import React from 'react';

const Card = () =>{
    return(
        <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">Need B+ blood</h5>
              <h6 className="card-subtitle mb-2 text-muted">Jabalpur,12/05/2021 05:55pm</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/" className="card-link">Contact</a>
              <a href="/" className="card-link">Share</a>
            </div>
        </div>
    )
}

const FilterForm = () =>{
    return(
        <div>
          <form className="FilterForm mt-2">
              <h4 className="text-center text-primary"><i className="fa fa-filter"></i>Filter</h4>
              <select className="form-control">
                <option>Category</option>
                <option>...</option>
              </select>
              <select className="form-control mt-2">
                <option>Type of Help</option>
                <option>...</option>
              </select>
              <select className="form-control  mt-2">
                <option>Urgency</option>
                <option>...</option>
              </select>
              <select className="form-control  mt-2">
                <option>Location</option>
                <option>...</option>
              </select>

              <p className="text-center mt-5">
              <button type="submit" className="btn btn-success">
                  Submit
              </button>
              </p>
          </form>
        </div>
    )
}

const RightBar = () =>{
    return(
        <div className="RightBar card w-100 mt-2">
            <div className="card-header bg-secondary text-warning">
               Most Recent searches
            </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Udit</h6>
              <h6 className="card-subtitle mb-2 text-warning">Udit</h6>
              <h6 className="card-subtitle mb-2 text-danger">Udit</h6>
              <h6 className="card-subtitle mb-2 text-success">Pratik</h6>
              <h6 className="card-subtitle mb-2 text-primary">Pratik</h6>
              <h6 className="card-subtitle mb-2 text-secondary">Shantanu</h6>
            </div>
        </div>
    )
}

const Postbutton = () =>{
  return(
      <div className="mt-2">
           <button className="btn btn-primary btn-block">Post A help</button>
      </div>
  )
}

export default function HomeMain(){
  
    return(<div className="container-fluid">
        <div className="row">
           <div className="col-2">
               <FilterForm/>
           </div>

           <div className="col-8">
               <div>
                   <h5>Sort by: 
                    <a className="ml-2" href="/home">Relavance</a>
                    <a className="ml-3" href="/home">Newest-first</a>
                    <a className="ml-3" href="/home">Nearest</a> 
                    <a className="ml-3" href="/home">Minimum-time</a>
                   </h5> 
               </div>
               <Card/>
               <Card/>
               <Card/>
           </div>
           <div className="col-2">
             <Postbutton/>
            <RightBar/>
            <hr></hr>
           </div>
        </div>
        </div>
    )
  }
