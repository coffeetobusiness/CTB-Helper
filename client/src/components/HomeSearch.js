import React from 'react';

export default function HomeSearch({filterSearch,setFilterSearch}){
  
    return(<>
        <div className="homesearch">
            
            <h2 data-aos="zoom-in" data-aos-duration="2500" className="text-center">How Can We help?</h2>
            <form className="searchForm">
            <div className="form-row">
             <div className="form-group col-3">
              <input placeholder="Keywords.." onChange={(e) => setFilterSearch(e.target.value)} type="text" className="form-control "/>
             </div>
             <div className="form-group col-3">
             <input placeholder="Type..City" onChange={(e) => setFilterSearch(e.target.value)} type="text" className="form-control "/>
             </div>
             <div className="form-group col-3">
             <select  class="form-control" onChange={(e) => setFilterSearch(e.target.value)}>
                    <option value="">Category</option>
                    <option>Medical</option>
                    <option>Financial</option>
                    <option>Food</option>
             </select>
             </div>
             <div className="form-group col"> 
                 <span onClick={(e) => setFilterSearch('')} className="btn btn-success">Clear Search</span>
             </div>
            </div>
            </form>

        </div>
        </>
    )
  }
