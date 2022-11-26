import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';
function Staff_homepage() {
  const navigate = useNavigate();
  const logout=()=>{
    console.log("logout");
    localStorage.clear();
  
    navigate("/login");
  }
  useEffect(()=>{
    if(!localStorage.getItem('token'))
      navigate('/');
  })
  useEffect(()=>{
    document.title='Staff';
  },[])
  return (
    <div>
       <div class="wrapper d-flex">
    <div class="sidebar">
      <small class="text-muted pl-3">Hostel Management  </small>
      <small class="text-muted-1 pl-3"> System  </small>
      <br/>
      <br/>

            <h6 class="head6">Staff</h6>
      <small class="text-muted pl-3">  </small>
      <ul>
      <li><Link to="/staffviewstudent"><i class="fas fa-home"></i>View Student Profile</Link></li>
        <li><Link to="/staffviewroom"><i class="far fa-credit-card"></i>View Room Details </Link></li>
        <li><Link to="/staffviewcomplain"><i class="fas fa-file-invoice"></i>View Complaints </Link></li>
        </ul>
    </div>
  </div>
  <div class="back-gr">
   
    <button type="button" class="btn btn-secondary" data-bs-toggle="button" onClick={logout}>Log out</button>
   
    
   
  </div>
    </div>
  )
}

export default Staff_homepage
