import React,{useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';

function Student_viewcomplain(props) {
    
  const navigate = useNavigate();
  const logout=()=>{
    console.log("logout");
    localStorage.clear();
  
    navigate("/login");
  }
  useEffect(()=>{
    document.title='View Complain';
  },[])
    const [details,setDetail]=useState([]);
  
    
  
 
 
    const fetchdata= async()=>{
      
  
      try {
     
        const response=await fetch("https://hostelmanagementlnm.herokuapp.com/api/fetchcomplain",{
          method:"POST",
          headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({ roll_no:localStorage.getItem('setstdRollno')})
        });
        let json= await response.json();
         setDetail(json);
        console.log(json);
        console.log(details);
       
        
      }
      catch (error) {
     
        console.log (error);
      }
  
    }
  
    useEffect(()=>{
     
      fetchdata();
     
    },[]);
  
  
   
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
    
        <button type="button" class="btn btn-primary" data-bs-toggle="button" onClick={logout}>Log out</button>
        <h1 class="head1">View Complaints history</h1>
    
        <div class="table_staff">
    
    {    
    details.length==0?<h1>No Complain yet</h1>:
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
    
            <table class="table table-bordered table-striped mb-0">
                <thead>
                    <tr>
                    <th class="th-sm">Complaint Id
                      </th>
                      <th class="th-sm">Department
                      </th>
                      <th class="th-sm">Description
                      </th>
                      
                      <th class="th-sm">Room No
                      </th>
                      <th class="th-sm">Status
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {
                
              
                details.map((data,index)=>{
                  return (
                  <tr key={index}>
                  <td>{data._id}</td>
                  <td>{data.dept}</td>
                  <td>{data.complain_desc}</td>
                  <td>{data.room_no}</td>
                  <td>{data.complain_status}</td>
                  </tr>
                  )
              })}
                  </tbody>
                  
            </table>
          
          </div>
}
        </div>
    
    
    
      </div>
      </>
    )

}

export default Student_viewcomplain;
