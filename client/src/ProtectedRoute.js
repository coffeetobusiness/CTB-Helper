import React,{useContext} from 'react';
import {  Route,Redirect } from 'react-router-dom'
import {  CredentialsContext } from './App';

function ProtectedRoute({component:Component, ...rest}){

    const [ credentials ] = useContext(CredentialsContext)

  return <Route {...rest} render={(props) =>{
      if(credentials){
          return <Component/> ;
      }else{
          return(
              <Redirect to={{ pathname:'/', }} />
          );
      }
  }}
  />;
}

export default ProtectedRoute;
