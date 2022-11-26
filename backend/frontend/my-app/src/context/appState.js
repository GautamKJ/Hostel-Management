import React,{useState} from 'react'
import appContext from './appContext';

import {Link,useNavigate} from "react-router-dom";
function AppState(props) {
 
  
    
  return (
    <appContext.Provider value={{}}>
        {props.children}
        </appContext.Provider>

  )
}


export default AppState


