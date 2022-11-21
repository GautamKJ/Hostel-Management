import React,{useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';


function Student_viewprofile() {
    const navigate = useNavigate();
  const logout=()=>{
    console.log("logout");
    localStorage.clear();
  
    navigate("/login");
  }
    const [stdRollno,setstdRollno]=useState("");

    
    const [details,setDetail]=useState({name:"",roll_no:"",contact:"",parent_contact:"",gender:"",password:"",year:""});
    const onsubmit=async(e)=>{
        
        
     
     try {
    
        console.log(stdRollno);
       const response=await fetch("http://localhost:8081/api/fetchstudentroll",{
         method:"POST",
         headers:{
           'content-Type':'application/json',
           'auth-token':localStorage.getItem('token')
         },
         body:JSON.stringify({ roll_no:localStorage.getItem('setstdRollno')})
       });
       let json= await response.json();
    
     
      
       console.log(json.length);
       if(json.length>0)
       setDetail(json[0]);
      
      
       
     }
     catch (error) {
    
       console.log (error);
     }
     
    }
    useEffect(()=>{
       
        onsubmit();
    },[])
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

        <button type="button" class="btn btn-secondary" data-bs-toggle="button">Log out</button>
        <h1 class="head1">Student Details</h1>

        <div class="container bootstrap snippets bootdey">
            <div class="row ng-scope">
                <div class="col-md-8">
                    <div class="box">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row pv-lg">
                                    <div class="col-lg-2"></div>
                                    <div class="col-lg-8">
                                        <form class="form-horizontal ng-pristine ng-valid">
                                            <div class="form-group">
                                                <label>Name</label>
                                                <input class="form-control" type="text" value={details.name} placeholder="Gautam Jha"
                                                    readonly/>
                                            </div>
                                            <div class="form-group">
                                                <label>Roll Number</label>
                                                <input class="form-control" type="text" value={details.roll_no} placeholder="20ucs090" readonly/>
                                            </div>
                                            <div class="form-group">
                                                <label>Gender</label>
                                                <input class="form-control" type="text" value={details.gender} placeholder="Male" readonly/>
                                            </div>
                                            <div class="form-group">
                                                <label>Student's Contact</label>
                                                <input class="form-control" type="text"  value={details.contact}placeholder="9680250320"
                                                    readonly/>
                                            </div>
                                            <div class="form-group">
                                                <label>Parent's Contact</label>
                                                <input class="form-control" type="text" value={details.parent_contact} placeholder="9680250320"
                                                    readonly/>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label>Admission year</label>
                                                <input class="form-control" type="text" value={details.year} placeholder="2020" readonly/>
                                            </div>
                                            <div class="form-group">
                                                <label>Room No</label>
                                                <input class="form-control" type="text" value={details.room_no} placeholder="2020" readonly/>
                                            </div>
                                            <div class="form-group">
                                                <label>Hostel No</label>
                                                <input class="form-control" type="text" value={details.hostel_no} placeholder="2020" readonly/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                    </div>

                <div class="col-md-4">
                    <div class="box">
                        <div class="panel panel-default">
                            <div class="panel-body text-center">
                                <div class="pv-lg"><img
                                        class="center-block img-responsive img-circle img-thumbnail thumb96"
                                        src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="profile"/></div>
                                <h3 class="m0 text-bold">{details.name}</h3>
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

export default Student_viewprofile
