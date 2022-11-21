import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';
function Student_addcomplain() {
    const [complain,setComplain]=useState({dept:"",complain_desc:"",room_no:"",hostel_no:""});
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
    const onchange=(e)=>{
        console.log("changing ",e.target.value);
        
        setComplain({...complain,[e.target.name]:e.target.value});
        console.log(complain.complain_desc);
      }
      const onsubmit=async(e)=>{
    
          
        e.preventDefault();
        try {
    
          const response=await fetch("http://localhost:8081/api/addcomplain",{
            method:"POST",
            headers:{
              'content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({comp_id:new Date().getTime().valueOf(), dept:complain.dept, complain_desc:complain.complain_desc,room_no:complain.room_no, hostel_no:complain.hostel_no,roll_no:localStorage.getItem('setstdRollno')})
          });
          
          if(response.status==200)
          window.alert("Complain Added Successfully");
          else
          window.alert("Some Error Occur");
          
        }
        catch (error) {
          console.log (error);
        }
    
        setComplain({dept:"",complain_desc:"",room_no:"",hostel_no:""});
    }
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

        <button type="button" class="btn btn-secondary" data-bs-toggle="button" onClick={logout}>Log out</button>
        <h1 class="head1">Create Complaint</h1>
        <div class="container bootstrap snippets bootdey">
            <div class="row ng-scope">
                <div class="col-md-8">
                    <div class="box">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row pv-lg">
                                    <div class="col-lg-2"></div>
                                    <div class="col-lg-8">
                                        <form class="form-horizontal ng-pristine ng-valid" onSubmit={onsubmit} >
                                            <div class="form-group">
                                                <label>Name</label>
                                                <input class="form-control" value={localStorage.getItem('setstudName')} type="text" placeholder="Autofill"
                                                    readonly/>
                                            </div>
                                            <div class="form-group">
                                                <label>Roll Number</label>
                                                <input class="form-control" value={localStorage.getItem('setstdRollno')} type="text" placeholder="Autofill" readonly/>
                                            </div>
                                            <div class="form-group">
                                                <label>Complaint Date</label>
                                                <input class="form-control" value={new Date()} type="text" placeholder="Autofill" readonly/>
                                            </div>
                                            <div class="form-group">
                                                <label>Complain Department</label>
                                                <select class="form-select" aria-label="Default select example" name='dept' onChange={onchange} value={complain.dept}>
                                                    <option selected>Select Department</option>
                                                    <option value="Air Conditioner Repair">Air Conditioner Repair </option>
                                                    <option value="Air Duct Related Repairs"> Air Duct Related Repairs</option>
                                                    <option value="Civil And Infrastructure Related">Civil And Infrastructure Related</option>
                                                    <option value="Electricity Related">Electricity Related</option>
                                                    <option value="Furniture Related">Furniture Related </option>
                                                    <option value="Plumbing Related">Plumbing Related</option>
                                                    <option value="RO Water Purifier Repair">RO Water Purifier Repair</option>
                                                    <option value="Store Related">Store Related </option>
                                                    <option value="Water Cooler Maintenance">Water Cooler Maintenance</option>
                                                    <option value="Others"> Others </option>

                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>Complain Description</label>
                                                <input type="text"    name="complain_desc"  value={complain.complain_desc}  onChange={onchange} className="form-control"/>
                                            </div>

                                            <div class="form-group">
                                                <select class="form-select" name='hostel_no' onChange={onchange} value={complain.hostel_no}  aria-label="Default select example">
                                                    <option selected>Select Hostel</option>
                                                    <option value="BH1">BH1</option>
                                                    <option value="BH2">BH2</option>
                                                    <option value="BH3">BH3</option>
                                                    <option value="BH4">BH4</option>
                                                    <option value="GH5">GH1</option>

                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>Room no</label>
                                                <input class="form-control" name='room_no' onChange={onchange}value={complain.room_no}  type="text" />
                                            </div>

                                           
                                           
                                            <button type="submit"  class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#myModal" disabled={complain.dept==""||complain.complain_desc==""||complain.room_no==""||complain.hostel_no==""}>Submit</button>
                

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
  )
}

export default Student_addcomplain
