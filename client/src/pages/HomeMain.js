import React,{useState,useEffect} from 'react';
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

export default function HomeMain(){
  const [filterSearch,setFilterSearch] =useState('');

    return(<div className="container-fluid">
        <div>
            <HomeSearch
             filterSearch={filterSearch}
             setFilterSearch={setFilterSearch}
             />
          </div>
        <div className="row">
           <div className="col-2">
               <FilterForm
               filterSearch={filterSearch}
               setFilterSearch={setFilterSearch}
               />
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
               <ApiCardData
                filterSearch={filterSearch}
                setFilterSearch={setFilterSearch}
               />
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
