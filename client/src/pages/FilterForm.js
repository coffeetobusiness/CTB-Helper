import React,{useState,useEffect} from 'react';

 const FilterForm = ({filterSearch,setFilterSearch}) =>{
     
    return(
        <div>
          <form className="FilterForm mt-2">
              <h4 className="text-center text-primary"><i className="fa fa-filter"></i>Filter</h4>
              <select  class="form-control" onChange={(e) => setFilterSearch(e.target.value)}>
                    <option>Category</option>
                    <option>Medical</option>
                    <option>Financial</option>
                    <option>Food</option>
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
              <div onClick={(e) => setFilterSearch('')} className="btn btn-danger btn-block">
                  Clear Filter
              </div>
              </p>
          </form>
          
        </div>
    )
}
export default FilterForm;