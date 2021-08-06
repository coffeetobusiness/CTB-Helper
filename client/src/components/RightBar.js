import React from 'react';

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
export default  RightBar;