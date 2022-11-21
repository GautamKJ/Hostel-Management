
import React, {useState,useContext } from 'react'

import {useNavigate} from "react-router-dom";
import AppContext from '../context/appContext';


function Login(props) {
  const [credentials,setcredentials]=useState({email:"",password:""});
  const navigate = useNavigate();
  const user=useContext(AppContext);
  const {setHostelNumber,setstdRollno,setstudName}=user;
  
  const setDetail=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value});
  }

  const onsubmit= async(e)=>{
    e.preventDefault();
    
    try {
      console.log(credentials.email);
      const response=await fetch("http://localhost:8081/api/login",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
        },
        body:JSON.stringify({ email:credentials.email, password:credentials.password})
      });
      const json= await response.json();
      
      if(json.token===undefined){
        alert("Wrong credentail\n Please try again with right credentails");
        setcredentials({email:"",password:""});
        return;
      }

      try {
        
        const response=await fetch("http://localhost:8081/api/loggeduser",{
          method:"POST",
          headers:{
            'content-Type':'application/json',
          },
          body:JSON.stringify({ email:credentials.email})
        });
        const json1= await response.json();

        if(json.token){
            
          localStorage.setItem('token',json.token);
          
          if(json1.length>0 && json1[0].department=='Admin')
            navigate("/adminhomepage");
          else if(json1.length>0 && json1[0].department=='Staff'){
            console.log(json1);
            localStorage.setItem('staffhostel', json1[0].hostel);
          navigate("/staffhomepage");
        
          }
          else{
            const response=await fetch("http://localhost:8081/api/fetchstudentroll",{
          method:"POST",
          headers:{
            'content-Type':'application/json',
          },
          body:JSON.stringify({ roll_no:credentials.email})
        });
        const json2= await response.json();
        if(json2.length>0){
        localStorage.setItem('setstdRollno', json2[0].roll_no);
        
        localStorage.setItem('setstudName', json2[0].name);
        
        if(json2[0].gender=='Female'){
          localStorage.setItem('setHostelNumber', 'GH1');
        }
       else if(json2[0].year=='2020')
       localStorage.setItem('setHostelNumber', 'BH1');
        else if(json2[0].year=='2019')
        localStorage.setItem('setHostelNumber', 'BH2');
        else if(json2[0].year=='2021')
        localStorage.setItem('setHostelNumber', 'BH3');
        else if(json2[0].year=='2022')
        localStorage.setItem('setHostelNumber', 'BH4');

      

        navigate("/studenthomepage");
      }
          }
            

      }
       
      }
      catch(error){
          console.log(error);
      }
       
      
    } catch (error) {
      console.log (error);
    }
    setcredentials({email:"",password:""});
  }
  return (
    <div>
      <div className="login-box">
  <h2>Hostel Management Software</h2>
  <form onSubmit={onsubmit}>
    <div className="user-box">
      <input type="text" name="email" value={credentials.email}  onChange={setDetail}/>
      <label>Username</label>
    </div>
    <div className="user-box">
      <input type="password" name="password" value={credentials.password}  onChange={setDetail}/>
      <label>Password</label>
    </div>
    <center>
    <button type="submit"  className="btn btn-primary gbtn" data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  disabled={credentials.email===""||credentials.password===""}
                   >Log in</button>
    <a href="/changepass">Change Password</a>
</center>
  </form>
</div>

    </div>
  )
}

export default Login
