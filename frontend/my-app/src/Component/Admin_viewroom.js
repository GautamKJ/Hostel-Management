import React ,{useEffect, useState,useContext} from 'react'
import {json, Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';
function Admin_viewroom() {
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
    document.title='View Room';
  },[])
  const [hostel,setHostel]=useState("");
  const [apiResponse, setApiResponse] = useState("*** now loading ***");  
  const [details,setDetail]=useState([]);
  
  const onchange= (e)=>{
    
    setHostel(e.target.value);  
    
  }
  const fetchdata= async()=>{
    console.log("onchange ",hostel);

    try {
   
      const response=await fetch("http://localhost:8081/api/fetchhostelroom",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({ hostel:hostel})
      });
      let json= await response.json();
      setDetail(json);
      
      // console.log(details);
     
      
    }
    catch (error) {
   
      console.log (error);
    }

  }
  useEffect(()=>{
   
    fetchdata();
   
  },[hostel]);
 
  
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
    <h1 class="head1">View Room List</h1>


    <div class="first_container">
      <h5>Select hostel to view rooms</h5>
      <select class="form-select" value={hostel} onChange={onchange} aria-label="Default select example">
        <option selected >Select Hostel</option>
        <option value="BH1">BH1</option>
        <option value="BH2">BH2</option>
        <option value="BH3">BH3</option>
        <option value="BH4">BH4</option>
        <option value="GH1">GH1</option>
      </select>
    </div>
    
    <div class="table_admin">
    <div class="table-wrapper-scroll-y my-custom-scrollbar">
    { details.length>0 && 
      <table class="table table-bordered table-striped mb-0">
        
          <thead>
              <tr>
                <th class="th-sm">#
                </th>
                <th class="th-sm">Room Number
                </th>
                
                
                <th class="th-sm">AC/NON-AC
                </th>
                <th class="th-sm">Occupant 1
                </th>
                <th class="th-sm">Occupant 2
                </th>
                
              
              </tr>
            </thead>

            <tbody>
              {
                
              
              details.map((data,index)=>{
                return (
                  <tr key={index}>
                <td>{index+1}</td>
                <td>{data.room_no}</td>
                <td>{data.room_ac}</td>
                <td>{data.occupant.length>=1?data.occupant[0].roll_no:"NaN"}</td>
                { data.room_occupancy==2 &&
                <td>{data.occupant.length==2?data.occupant[1].roll_no:"NaN"}</td>
              }
              
              </tr>
                )
              })}
            
            </tbody>

            
      </table>
}    
    </div>
  

  </div>

    </div>
    </div>
  )
}

export default Admin_viewroom
