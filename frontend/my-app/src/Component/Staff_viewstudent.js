import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';


function Staff_viewstudent() {
  const [roll,setRoll]=useState("");
  const navigate = useNavigate();
  const logout=()=>{
    console.log("logout");
    localStorage.clear();
  
    navigate("/login");
  };
  useEffect(()=>{
    if(!localStorage.getItem('token'))
      navigate('/');
  })
  
  const [details,setDetail]=useState({name:"",roll_no:"",contact:"",parent_contact:"",gender:"",password:"",year:""});
  const onchange=(e)=>{
    setRoll(e.target.value);

  }
  const onsubmit=async(e)=>{

    console.log(roll);
    setDetail(({name:"",roll_no:"",contact:"",parent_contact:"",gender:"",password:"",year:""}));
 e.preventDefault();
 try {

   const response=await fetch("http://localhost:8081/api/fetchstudentstaff",{
     method:"POST",
     headers:{
       'content-Type':'application/json',
       'auth-token':localStorage.getItem('token')
     },
     body:JSON.stringify({ roll_no:roll,hostel_no:localStorage.getItem('staffhostel')})
   });
   let json= await response.json();

   if(json.length==0){
    window.alert(`Student with Roll No. ${roll} does not exists.`);
    setRoll("");
    return;
   }
  
   console.log(json.length);
   if(json.length>0)
   setDetail(json[0]);
  
  
   
 }
 catch (error) {

   console.log (error);
 }
 setRoll("");
}
  return (
    <div>
       <div className="wrapper d-flex">
    <div className="sidebar">
      <small className="text-muted pl-3">Hostel Management </small>
      <small className="text-muted-1 pl-3"> System </small>
      <br/>
      <br/>

            <h6 className="head6">Staff</h6>
      <small className="text-muted pl-3"> </small>
      <ul>
      <li><Link to="/staffviewstudent"><i class="fas fa-home"></i>View Student Profile</Link></li>
        <li><Link to="/staffviewroom"><i class="far fa-credit-card"></i>View Room Details </Link></li>
        <li><Link to="/staffviewcomplain"><i class="fas fa-file-invoice"></i>View Complaints </Link></li>
        </ul>
    </div>
  </div>
  <div className="back-gr">

    <button type="button" className="btn btn-secondary" data-bs-toggle="button" onClick={logout}>Log out</button>
    <h1 className="head1">Search Student Profile</h1>


    <form onSubmit={onsubmit}>

      <div className="container bootstrap snippets bootdey">
        <div className="row ng-scope">
          <div className="col-md-8">
            <div className="box">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row pv-lg">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                      <div className="form-group">
                        <label>Roll Number</label>
                        <input type="text"   name="roll_no"  value={roll}  onChange={onchange} className="form-control"/>
                   
                   </div>


                   <div className="submit" >    <button type="submit" disabled={roll==""}  class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#myModal" >Search</button>
</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      </form>

{details.name!="" &&

    <div className="container bootstrap snippets bootdey">
      <div className="row ng-scope">
        <div className="col-md-8">
          <div className="box">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row pv-lg">
                  <div className="col-lg-2"></div>
                  <div className="col-lg-8">
                    <div className="overflow-auto">
                      <div className="student_info_admin">
                        <form className="form-horizontal ng-pristine ng-valid">
                          <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" type="text" placeholder="Gautam Jha" value={details.name} readonly/>
                          </div>
                          <div className="form-group">
                            <label>Roll Number</label>
                            <input className="form-control" type="text" placeholder="20ucs090" value={details.roll_no} readonly/>
                          </div>
                          <div className="form-group">
                            <label>Gender</label>
                            <input className="form-control" type="text" placeholder="Male" value={details.gender}readonly/>
                          </div>
                          <div className="form-group">
                            <label>Student's Contact</label>
                            <input className="form-control" type="text" placeholder="9680250320"value={details.contact} readonly/>
                          </div>
                          <div className="form-group">
                            <label>Parent's Contact</label>
                            <input className="form-control" type="text" placeholder="9680250320"value={details.parent_contact} readonly/>
                          </div>
                          
                          <div className="form-group">
                            <label>Admission year</label>
                            <input className="form-control" type="text" placeholder="2020" value={details.year} readonly/>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
}
  </div>


    </div>
  )
}

export default Staff_viewstudent
