
import React,{useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';

function Staff_viewroom(props) {
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
  const [newroll,setNewroll]=useState("");
  const [details,setDetail]=useState([]);
  const [room_no,setRoomNo]=useState("");
  const [name,setName]=useState("");
  const[rollno,setRollno]=useState("");
  const[comId,setcomId]=useState("");
  // const [room_no,setRoomNo]=useState("");

  const onchange=(e)=>{
    setNewroll(e.target.value);
  }
const selectUser= async(id,roll)=>{
  console.log(roll);
  try {
   
    const response=await fetch("http://localhost:8081/api/fetchroomdetailwithid",{
      method:"POST",
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({_id:id})
    });
    let json= await response.json();
    
    setRoomNo(json[0].room_no);
    setRollno(roll);
    setName(json[0].name);
    setcomId(id);
  }
  catch (error) {
 
    console.log (error);
  }

}

const onsubmit=async(e)=>{
  e.preventDefault();
  console.log("afd");
  console.log(comId,rollno,newroll);
  try {
   
    const response=await fetch("http://localhost:8081/api/updateroom",{
      method:"PUT",
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({_id:comId,oldrollno:rollno,newrollno:newroll})
    });
    let json= await response.json();
    if(json)
    fetchdata();
  }
  catch (error) {
 
    console.log (error);
  }
}
  
  

  const fetchdata= async()=>{
    

    try {
   
      const response=await fetch("http://localhost:8081/api/fetchhostelroom",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({ hostel:localStorage.getItem('staffhostel')})
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
      <div className="wrapper d-flex">
    <div className="sidebar">
      <small className="text-muted pl-3">Hostel Management </small>
      <small className="text-muted-1 pl-3"> System </small>
      <br/><br/>

      <h6 className="head6">Staff</h6>
      <small className="text-muted pl-3"> </small>
      <ul>
        <li><Link to="/staffviewstudent"><i className="fas fa-home"></i>View Student Profile</Link></li>
        <li><Link to="/staffviewroom"><i className="far fa-credit-card"></i>View Room Details </Link></li>
        <li><Link to="/staffviewcomplain"><i className="fas fa-file-invoice"></i>View Complaints </Link></li>
        </ul>
    </div>
  </div>
  <div className="back-gr">

    <button type="button" className="btn btn-secondary" data-bs-toggle="button" onClick={logout}>Log out</button>
    <h1 className="head1">View Room List</h1>


    
    
    <div className="table_staff">

        
        <div className="table-wrapper-scroll-y my-custom-scrollbar">

            <table className="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th class="th-sm">#
                </th>
                <th class="th-sm">Room Number
                </th>
                
                
                <th class="th-sm">AC/NON-AC
                </th>
                <th class="th-sm">Roll Number
                </th>
                <th class="th-sm">Roll Number
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
                <td>{data.occupant.length>=1?data.occupant[0].roll_no:"NaN"}  
                
                <div class="primarybut">
                        <button type="button" class="btn btn-primary" onClick={async() => await selectUser(data._id,data.occupant.length>=1?data.occupant[0].roll_no:"NaN")} data-bs-toggle="modal"
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
                             
                                <h5>Currrent occupant roll no</h5>
                                <h6>{rollno}</h6>
                                <h5 class="temp">Edit occupant</h5>
        
                                <form  onSubmit={onsubmit}>
                                  <div>
                                    <label class="form-label"> New student roll no </label>
                                    <input type="text" class="form-control" onChange={onchange} value={newroll}/>
                                  </div>
                                  <button type='submit'>Update</button>
                                </form>
                                
                              </div>
        
                            </div>
                          </div>
        
                        </div>
                      </div>

                </td>
                { data.room_occupancy==2 &&
                <td>{data.occupant.length==2?data.occupant[1].roll_no:"NaN"} 
                  
                <div class="primarybut">
                        <button type="button" class="btn btn-primary" onClick={async() => await selectUser(data._id,data.occupant.length>1?data.occupant[1].roll_no:"NaN")} data-bs-toggle="modal"
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
                             
                                <h5>Currrent occupant roll no</h5>
                                <h6>{rollno}</h6>
                                <h5 class="temp">Edit occupant</h5>
        
                                <form action="onSubmit">
                                  <div>
                                    <label class="form-label"> New student roll no </label>
                                    <input type="text" class="form-control" value={newroll}/>
                                  </div>
                                  <button type='submit'>Update</button>
                                </form>
                                
                              </div>
        
                            </div>
                          </div>
        
                        </div>
                      </div>


                </td>
                
              }
              
              </tr>
                )
              })}
            
            </tbody>

            
            </table>
          
          </div>
        </div>
        
  </div>

    </div>
  )
}

export default Staff_viewroom
