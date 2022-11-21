import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';
function Admin_homepage() {
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
  return (
    <div>
         <div class="wrapper d-flex">
       <div class="sidebar">
      <small class="text-muted pl-3">Hostel Management  </small>
      <small class="text-muted-1 pl-3"> System  </small>
      <br/>
      <br/>
      
       <h6 class="head6">Admin</h6>
      <small class="text-muted pl-3">  </small>
      <ul>
      <li><Link to="/addstudent"><i className="fas fa-home"></i>Add Student</Link></li>
        <li><Link to="/deletestudent"><i className="fas fa-home"></i>Delete Student</Link></li>
        <li><Link to="/adminviewstudent"><i className="far fa-credit-card"></i>View Student Profile </Link></li>
        <li><Link to="/adminviewroom"><i className="fas fa-file-invoice"></i>View Room List </Link></li>
      </ul>

    </div>
  </div>
  <div class="back-gr">
   
    <button type="button" class="btn btn-secondary" data-bs-toggle="button" onClick={logout}>Log out</button>
   
    
    
   
  </div>
    </div>
  )
}

export default Admin_homepage
