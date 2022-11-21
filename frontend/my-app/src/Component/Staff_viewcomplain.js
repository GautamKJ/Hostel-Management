import React,{useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';
function Staff_viewcomplain(props) {
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
    document.title='View Complain';
  },[])
  const [currstatus,setCurrstatus]=useState("");
  const [id,setId]=useState("");

  const [details,setDetail]=useState([]);
  
  const onchange= (e)=>{
    
    setCurrstatus(e.target.value);  
    
  }
 
  const [newroll,setNewroll]=useState("");
  
  const [room_no,setRoomNo]=useState("");
  const [desc,setdesc]=useState("");
  const[rollno,setRollno]=useState("");
  const [status,setStatus]=useState("");
  // const [room_no,setRoomNo]=useState("");

const selectUser= async(id)=>{
  console.log(id);
  try {
   
    const response=await fetch("http://localhost:8081/api/fetchcomplainid",{
      method:"POST",
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({_id:id})
    });
    let json= await response.json();
    
    setRoomNo(json[0].room_no);
    setRollno(json[0].roll_no);
    setdesc(json[0].complain_desc);
    setCurrstatus(json[0].complain_status)
    setId(id);

  }
  catch (error) {
 
    console.log (error);
  }

}

const onupdate= async(id)=>{
  console.log("IDDD ",id);
  try {
   
    const response=await fetch(`http://localhost:8081/api/updatecomplain/${id}`,{
      method:"PUT",
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({complain_status:currstatus})
      
    });
    let json= await response.json();
    
    fetchdata();
    setCurrstatus(json[0].complain_status)

  }
  catch (error) {
 
    console.log (error);
  }

}
  const fetchdata= async()=>{
    

    try {
   
      const response=await fetch("http://localhost:8081/api/fetchhostelcomplain",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({ hostel_no:localStorage.getItem('staffhostel')})
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
    <div>
       <div class="wrapper d-flex">
        <div class="sidebar">
            <small class="text-muted pl-3">Hostel Management </small>
            <small class="text-muted-1 pl-3"> System </small>
            <br/><br/>

            <h6 class="head6">Staff</h6>
            <small class="text-muted pl-3"> </small>
            <ul>
            <li><Link to="/staffviewstudent"><i class="fas fa-home"></i>View Student Profile</Link></li>
        <li><Link to="/staffviewroom"><i class="far fa-credit-card"></i>View Room Details </Link></li>
        <li><Link to="/staffviewcomplain"><i class="fas fa-file-invoice"></i>View Complaints </Link></li>
                </ul>
        </div>
    </div>
    <div class="back-gr">

        <button type="button" class="btn btn-secondary" data-bs-toggle="button" onClick={logout}>Log out</button>
        <h1 class="head1">View Complaints</h1>

        <div class="table_staff">

{details.length==0?<h2>No Complain yet</h2>:        
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
                
              
              details.map(data=>{
                return (
                <tr key={data._id}>
                <td>{data._id}</td>
                <td>{data.dept}</td>
                <td>{data.complain_desc}</td>
                <td>{data.room_no}</td>
                <td>{data.complain_status}</td>
                <td>
                <div class="primarybut">
                        <button type="button" class="btn btn-primary" onClick={async() => await selectUser(data._id)} data-bs-toggle="modal"
                          data-bs-target="#myModal">Edit</button>
                        <div class="modal" id="myModal">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modalheader1">
                                <div class="modal-header">
                                  <div class="modal-title"> Edit details of room </div>
                                  <div class="cross">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                  </div>
        
                                </div>
                              </div>
                              <div class="modal-body">
        
                              <h5>Hostel no </h5>
                                <h6>{localStorage.getItem('staffhostel')}</h6>
                                <h5>Room no </h5>
                                <h6>{room_no}</h6>
                                <h5>Description </h5>
                                <h6>{desc}</h6>
                                <h5>Status </h5>
                                <select class="form-select" value={currstatus} onChange={onchange} aria-label="Default select example">
                                  <option selected>Status</option>
                                  <option value="Running">Running </option>
                                  <option value="Pending">Pending</option>
                                  <option value="Solved">Solved</option>
        
                                </select>
                                <button type="button" class="btn btn-primary"  onClick={async() => await onupdate(id)} data-bs-toggle="modal"
                                  data-bs-target="#myModal">Update</button>
                                
                              </div>
        
                            </div>
                          </div>
        
                        </div>
                      </div>
                </td>


                
       
              </tr>
                )
              })}
            
            </tbody>
                  
            </table>
          
          </div>
}
        </div>

    </div>

    </div>
  )
}

export default Staff_viewcomplain
