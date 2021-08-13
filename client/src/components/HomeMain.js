import React,{useState} from 'react';
import { Link,  } from "react-router-dom";

import ApiCardData from './ApiCardData'
import FilterForm from './FilterForm'
import RightBar from './RightBar'
import HomeSearch from './HomeSearch';


const Postbutton = () =>{
  return(
      <div className="mt-2">
        <Link className="btn btn-primary btn-block" to="/helpform">Post A help</Link>
      </div>
  )
}
const VolunteerBtn = () =>{
  return(
      <div className="mt-2">
        <Link className="btn btn-primary btn-block" to="/volunteerform">Request For Volunteer</Link>
      </div>
  )
}

export default function HomeMain(){
  const [filterSearch,setFilterSearch] =useState('');

    return(<div className="">
        <div>
            <HomeSearch
             filterSearch={filterSearch}
             setFilterSearch={setFilterSearch}
             />
          </div>
        <div className="row mainbody container-fluid">
           <div className="col">
               <FilterForm
               filterSearch={filterSearch}
               setFilterSearch={setFilterSearch}
               />
           </div>

           <div className="col-8">
               <ApiCardData
                filterSearch={filterSearch}
                setFilterSearch={setFilterSearch}
               />
           </div>
           <div className="col">
             <Postbutton/>
             <VolunteerBtn/>
            <RightBar/>
            <hr></hr>
           </div>
        </div>
        </div>
    )
  }
