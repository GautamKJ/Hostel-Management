import React,{useState,useContext, useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';
function Admin_deletestudent() {
  const [roll,setRoll]=useState("");
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
    document.title='Delete Student';
  },[])
  const onchange=(e)=>{
    setRoll(e.target.value);

  }
  const onsubmit=async(e)=>{

    console.log(roll);
 e.preventDefault();
 try {

   const response=await fetch("https://hostels-management.onrender.com/api/deletestudent",{
     method:"POST",
     headers:{
       'content-Type':'application/json',
       'auth-token':localStorage.getItem('token')
     },
     body:JSON.stringify({ roll_no:roll})
   });
   if(response.status==400)
   window.alert("Wrong Roll Number");
   else
   window.alert("Student Deleted Successfully");
   
 }
 catch (error) {
  
  //  console.log (error);
 }

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
    <h1 className="head1">Delete Student</h1>



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
                    <div className="submit">
                    <button type="submit"disabled={roll==""}  class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#myModal" >Delete</button>
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
export default Admin_deletestudent;
