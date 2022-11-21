import React,{useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from "react-router-dom";
function Student_sidebar() {
  return (
    <>
    
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

    <button type="button" class="btn btn-primary" data-bs-toggle="button">Log out</button>


</div>

    </>
  )
}

export default Student_sidebar
