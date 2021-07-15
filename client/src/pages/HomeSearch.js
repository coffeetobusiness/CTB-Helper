import React from 'react';

export default function HomeSearch(){
  
    return(<>
        <div className="homesearch">
            
            <h2 className="text-center">How Can We help?</h2>
            <form className="searchForm">
            <div className="form-row">
             <div className="form-group col-3">
              <input placeholder="Keywords.." type="text" className="form-control "/>
             </div>
             <div className="form-group col-3">
              <select className="form-control">
               <option selected>All Regions</option>
               <option>...</option>
              </select>
             </div>
             <div className="form-group col-3">
              <select className="form-control">
               <option selected>Category</option>
               <option>...</option>
              </select>
             </div>
             <div className="form-group col"> 
                 <button className="btn btn-success">Search</button>
             </div>
            </div>
            </form>

        </div>
        </>
    )
  }
