import React, { useContext, useEffect, useState } from 'react'

import {Link,useNavigate} from "react-router-dom";
import Spinner from './Spinner';
import appContext from '../context/appContext';
function Admin_addStudent() {
  const [details,setDetail]=useState({name:"",roll_no:"",contact:"",parent_contact:"",gender:"",password:"",year:""});
  const [loading,setLoading]=useState();
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
    setLoading(false);
    document.title="Add Student";
  },[])
  const onchange=(e)=>{
    
    console.log(e.target.name);
    console.log(e.target.value);
    setDetail({...details,[e.target.name]:e.target.value});
  }
  const onsubmit=async(e)=>{

       console.log(details.gender);
    e.preventDefault();
    try {

      const response=await fetch("https://hostelmanagementlnm.herokuapp.com/api/addstudent",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({ name:details.name, roll_no:details.roll_no,contact:details.contact, parent_contact:details.parent_contact,gender:details.gender, password:details.password,year:details.year})
      });
      if(response.status==200){
        setLoading(true);
        try{
          const response=await fetch("https://hostelmanagementlnm.herokuapp.com/api/sendmail",{
            method:"POST",
            headers:{
              'content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({ to:details.roll_no+"@lnmiit.ac.in", subject:"Login Credential",description:`Welcome to LNM institute of information technology.<br>
            We have provided you credentials for Hostel Management Sysytem.<br><br>
            You are requested to change your password.<br><br>
            Through this site you will be able to -<br>
            1)Book your desired room.<br>
            2)Register complaints you face in Hostel.<br>
            3)View your profile.<br><br><br>
            
            UserName : ${details.roll_no}<br>
            Password : ${details.password}<br>
            <br><br><br><br>
            Chief Warden<br>
            Ajit PAtel`})
          });
        }
        catch(error){
          console.log ("sendEmail error "+error);
        }
        setLoading(false);
        window.alert("Student added successfully");
      }
      else{
        window.alert("Student already exist");
      }
    }
    catch (error) {
      console.log (error);
    }

    setDetail({name:"",roll_no:"",contact:"",parent_contact:"",gender:"",password:"",year:""});
}
  return (
    <div>
      <div className="wrapper d-flex">
    <div className="sidebar">
      <small className="text-muted pl-3">Hostel Management </small>
      <small className="text-muted-1 pl-3"> System </small>
      <br/>
      <br/>

      <h6 className="head6">Admin</h6>
      <small className="text-muted pl-3"> </small>
      <ul>
        <li><Link to="/addstudent"><i className="fas fa-home"></i>Add Student</Link></li>
        <li><Link to="/deletestudent"><i className="fas fa-home"></i>Delete Student</Link></li>
        <li><Link to="/adminviewstudent"><i className="far fa-credit-card"></i>View Student Profile </Link></li>
        <li><Link to="/adminviewroom"><i className="fas fa-file-invoice"></i>View Room List </Link></li>
        </ul>
        
    </div>
  </div>
  <div className="back-gr">

    <button type="button" className="btn btn-secondary" data-bs-toggle="button" onClick={logout}>Log out</button>
    <h1 className="head1">Add Student</h1>

      
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
                      { loading && <Spinner/>}
                        <label>Name</label>
                        <input type="text"    name="name"  value={details.name}  onChange={onchange} className="form-control"/>
                      </div>
                      <div className="form-group">
                        <label>Roll Number</label>
                        <input type="text"   name="roll_no"  value={details.roll_no}  onChange={onchange} className="form-control"/>
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="typePhone" placeholder="01234-56789" onChange={onchange} value={details.contact} name="contact"    className="form-control"/>
                      </div>
                      <div className="form-group">
                        <label>Parent's Contact</label>
                        <input type="text" id="typePhone" placeholder="01234-56789" onChange={onchange} value={details.parent_contact} name="parent_contact"  className="form-control"/>
                      
                      </div>
                      
                      <div className="form-group">
                        <label>First time Password</label>
                        <input type="text" name="password" value={details.password} onChange={onchange} className="form-control"/>
                      </div>
                      <div className="form-group">

                        <select className="form-select" name="gender" value={details.gender} onChange={onchange} aria-label="Default select example">
                          <option selected>Select Gender</option>
                          <option value="Male">Male </option>
                          <option value="Female"> Female</option>


                        </select>
                      </div>

                      <div className="form-group">
                        <label>Year</label>
                        <input type="number" placeholder="2000" name="year" value={details.year}onChange={onchange} className="form-control"/>
                      </div>

                      <div className="submit">
                      <button type="submit"  class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#myModal" disabled={details.name=="" || details.roll_no==""||details.contact==""||details.parent_contact==""||details.gender==""||details.password==""||details.year==""}>Register</button>
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
</div>

  </div>

    
  )
}

export default Admin_addStudent
