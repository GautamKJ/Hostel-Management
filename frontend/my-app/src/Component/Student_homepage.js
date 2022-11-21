import React,{useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';

function Student_homepage() {

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
      <small class="text-muted pl-3">Hostel Management </small>
      <small class="text-muted-1 pl-3"> System </small>
      <br/>
      <br/>

            <h6 class="head6">Student</h6>
      <small class="text-muted pl-3"> </small>
      <ul>
       
      <li><Link to="/bookroom"><i class="fas fa-home"></i>Book Room</Link></li>
                <li><Link to="/studentprofile"><i class="far fa-credit-card"></i>Check profile </Link>
                </li>
                <li><Link to="/addcomplain"><i class="fas fa-file-invoice"></i>Register Complain </Link></li>
                <li><Link to="/studentviewcomplain"><i class="fas fa-file-invoice"></i>View Complain </Link></li>
                </ul>
    </div>
  </div>
  <div class="back-gr">

    <button type="button" class="btn btn-primary" data-bs-toggle="button" onClick={logout}>Log out</button>


</div>
  </div>
   
  )
}

export default Student_homepage

