import React,{useState,useEffect,useContext} from 'react'
import {Link,useNavigate} from "react-router-dom";
import appContext from '../context/appContext';
import Spinner from "./Spinner"

function Student_bookroom() {
  
  const navigate = useNavigate();
  const logout=()=>{
    console.log("logout");
    localStorage.clear();
  
    navigate("/login");
  }
  useEffect(()=>{
    document.title='Book Room';
  },[])
  useEffect(()=>{
    if(!localStorage.getItem('token'))
      navigate('/');
  })
  const [RoomAc,setroom_ac]=useState("");
 
  
  const [bookdone,setBookdone]=useState(false);
  
  const [room,setRoom]=useState("");
  const [details,setDetail]=useState([]);
  
  const [roomtemp,setRoomtemp]=useState("");
  const [roomType,setRoomType]=useState("");
  const onchange=(e)=>{
    
    setroom_ac({...RoomAc,[e.target.name]:e.target.value});

    
  }
      const onHandle=(e)=>{
        console.log(e.target.value);
        setRoom(e.target.value);
      }

const getStudentdata=async()=>{
  try {
   
    const response=await fetch("https://hostels-management.onrender.com/api/fetchstudentroll",{
      method:"POST",
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({  roll_no:localStorage.getItem('setstdRollno')})
    });
    let json= await response.json();
    
    if(json.length>0 && json[0].room_no!=""){
      console.log("asdfafsd");
      setBookdone(true);
    }
   
    
  }
  catch (error) {
 
    console.log (error);
  }
}
  const fetchdata= async()=>{
    console.log("Fetch data");
    
    try {
   
      const response=await fetch("https://hostels-management.onrender.com/api/fetchhostelroom",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({ hostel:localStorage.getItem('setHostelNumber')})
      });
      let json= await response.json();
      console.log(json);
      setDetail(json);
      
     
      
    }
    catch (error) {
   
      console.log (error);
    }
  }

  const bookRoom=async()=>{
    console.log("room",room);
    try {
     
      const response=await fetch("https://hostels-management.onrender.com/api/bookroom",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({hostel:localStorage.getItem('setHostelNumber'),room_no:room,roll_no:localStorage.getItem('setstdRollno')})
      });
      let json= await response.json();
      if(json){
        setBookdone(true);
        window.alert("Room Booked Successfully");
      }
     
    
  
    }
    catch (error) {
   
      console.log (error);
    }
  
  }
  const selectRoom= async()=>{
  console.log("room",room);
    try {
     
      const response=await fetch("https://hostels-management.onrender.com/api/fetchparticularroom",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({hostel:localStorage.getItem('setHostelNumber'),room_no:room})
      });
      let json= await response.json();
      
      setRoomtemp(json[0].room_ac);
      setRoomType(json[0].room_type);
    
  
    }
    catch (error) {
   
      console.log (error);
    }
  
  }

  useEffect(()=>{
   
    
    fetchdata();
   getStudentdata();
   

  },[]);



  
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

    <h1 class="head1">Book Room</h1>
    <h3 class="head3"> Select room details</h3>

    <button type="button" class="btn btn-secondary" data-bs-toggle="button" onClick={logout}>Log out</button>


    <div class="btn-group bt1" role="group" aria-label="Basic radio toggle button group"   >


      <input type="radio" class="btn-check" name='room_type' value="Single"  onChange={onchange} id="btnradio1"  autocomplete="off" />
      <label class="btn btn-outline-primary" for="btnradio1">Single</label>

      <input type="radio" class="btn-check"  name='room_type' value="Double" id="btnradio2" onChange={onchange}  autocomplete="off"/>
      <label class="btn btn-outline-primary" for="btnradio2">Double</label>


    </div>

    <div class="btn-group bt3" role="group" aria-label="Basic radio toggle button group" >


      <input type="radio" class="btn-check" name='RoomAc' onChange={onchange} value='AC' id="btnradio3" autocomplete="off"/ >
      <label class="btn btn-outline-primary" for="btnradio3">AC</label>

      <input type="radio" class="btn-check" name='RoomAc' onChange={onchange}  value='NON-AC' id="btnradio4" autocomplete="off"/>
      <label class="btn btn-outline-primary" for="btnradio4">NON-AC</label>


    </div>
    
    <div class="bt4">
      <select class="form-select" aria-label="Default select example" value="BH1" >
        <option selected>{localStorage.getItem('setHostelNumber')}</option>
       

      </select>
    </div >
   
    
    <div class="booking_scroll">
      <div class="table-wrapper-scroll-x my-custom-scrollbar">
      <div  class="btn-group1 bt5" role="group" aria-label="Basic radio toggle button group">
      
{
 
  details.map(data=>{
   
      return(
  
        <>
          <input type="radio" class="btn-check" name='room' onChange={onHandle}  value={data.room_no} id={data._id} autocomplete="off" disabled={(data.occupant.length==data.room_occupancy || data.room_ac!==RoomAc.RoomAc || data.room_type!==RoomAc.room_type )} / >

          <label class="btn btn-outline-success roomno" for={data._id}>{data.room_no}</label>
          
          </>

          
        )
          
        })
}        

</div>

      </div>
    </div>
  
    <div class="book_room">
      <div class="primarybut">
        <button type="button" class="btn btn-primary" onClick={() =>  selectRoom()} data-bs-toggle="modal" disabled={(room=="" || bookdone)} data-bs-target="#myModal">Book Room
        </button>
        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modalheader1">
                <div class="modal-header">
                  <div class="modal-title"> Book Room </div>
                  <div class="cross">
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                </div>
              </div>
              <div class="modal-body">

                <h5> Hostel number </h5>
                <h6>{"BH1"}</h6>
                <h5>Room number </h5>
                <h6>{room}</h6>
                <h5>
                  SINGLE/Double </h5>
                <h6>{roomType}</h6>
                <h5>AC/NON-AC </h5>
                <h6>{roomtemp}</h6>
                
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#myModal" onClick={() =>  bookRoom()} >Submit</button>
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

export default Student_bookroom
