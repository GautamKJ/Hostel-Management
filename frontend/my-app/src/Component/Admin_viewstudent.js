import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';
function Admin_viewstudent() {
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
  const [roll,setRoll]=useState("");
  const [details,setDetail]=useState({name:"",roll_no:"",contact:"",parent_contact:"",gender:"",password:"",year:""});
  const onchange=(e)=>{
    setRoll(e.target.value);

  }
  const onsubmit=async(e)=>{

    console.log(roll);
    setDetail(({name:"",roll_no:"",contact:"",parent_contact:"",gender:"",password:"",year:""}));
 e.preventDefault();
 try {

   const response=await fetch("http://localhost:8081/api/fetchstudentroll",{
     method:"POST",
     headers:{
       'content-Type':'application/json',
       'auth-token':localStorage.getItem('token')
     },
     body:JSON.stringify({ roll_no:roll})
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
      
      <div class="wrapper d-flex">
    <div class="sidebar">
      <small class="text-muted pl-3">Hostel Management </small>
      <small class="text-muted-1 pl-3"> System </small>
      <br/>
      <br/>
      
       <h6 class="head6">Admin</h6>
      <small class="text-muted pl-3"> </small>
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
    <h1 class="head1">Search Student Profile</h1>


    <form onSubmit={onsubmit}>

    <div class="container bootstrap snippets bootdey">
      <div class="row ng-scope">
        <div class="col-md-8">
          <div class="box">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row pv-lg">
                  <div class="col-lg-2"></div>
                  <div class="col-lg-8">
                    <div class="form-group">
                    <label>Roll Number</label>
                    <input type="text"   name="roll_no"  value={roll}  onChange={onchange} className="form-control"/>
                   
                    </div>


                    <div class="submit">    <button type="submit" disabled={roll==""}>Search</button>
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

    <div class="container bootstrap snippets bootdey">
      <div class="row ng-scope">
        <div class="col-md-8">
          <div class="box">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row pv-lg">
                  <div class="col-lg-2"></div>
                  <div class="col-lg-8">
                    <div class="overflow-auto">
                      <div class="student_info_admin">
                        <form class="form-horizontal ng-pristine ng-valid">
                          <div class="form-group">
                            <label>Name</label>
                            <input class="form-control" type="text" placeholder="Gautam Jha" value={details.name} readonly/>
                          </div>
                          <div class="form-group">
                            <label>Roll Number</label>
                            <input class="form-control" type="text" placeholder="20ucs090" value={details.roll_no} readonly/>
                          </div>
                          <div class="form-group">
                            <label>Gender</label>
                            <input class="form-control" type="text" placeholder="Male" value={details.gender}readonly/>
                          </div>
                          <div class="form-group">
                            <label>Student's Contact</label>
                            <input class="form-control" type="text" placeholder="9680250320"value={details.contact} readonly/>
                          </div>
                          <div class="form-group">
                            <label>Parent's Contact</label>
                            <input class="form-control" type="text" placeholder="9680250320"value={details.parent_contact} readonly/>
                          </div>
                          
                          <div class="form-group">
                            <label>Admission year</label>
                            <input class="form-control" type="text" placeholder="2020" value={details.year} readonly/>
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

export default Admin_viewstudent
