import React from 'react';

 const FilterForm = ({filterSearch,setFilterSearch}) =>{
     
    return(
        <div data-aos="fade-right" data-aos-duration="1000">
          <form className="FilterForm mt-2">
              <h4 className="text-center text-primary"><i className="fa fa-filter"></i>Filter</h4>
              <select  class="form-control" onChange={(e) => setFilterSearch(e.target.value)}>
                    <option value="">Category</option>
                    <option>Medical</option>
                    <option>Financial</option>
                    <option>Food</option>
              </select>
              <select  class="form-control mt-2" onChange={(e) => setFilterSearch(e.target.value)}>
                    <option value="">State</option>
                    <option>Maharashtra</option>
                    <option>Madhya Pradesh</option>
              </select>

              <input onChange={(e) => setFilterSearch(e.target.value)} placeholder="Location - address,place" className="form-control mt-1"/>

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