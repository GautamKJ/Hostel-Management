import React, { useState,useEffect } from 'react'

function Changepassword() {
    const [details,setDetail]=useState({email:"",oldPass:"",newPass:""});

    const onchange=(e)=>{
    
        setDetail({...details,[e.target.name]:e.target.value});
      }
      const onsubmit=async(e)=>{
        e.preventDefault();
        console.log(details.email,details.oldPass,details.newPass);
        try {
       
          const response=await fetch("https://hostelmanagementlnm.herokuapp.com/api/changePassword",{
            method:"PUT",
            headers:{
              'content-Type':'application/json',
              
            },
            body:JSON.stringify({ email:details.email,oldPass:details.oldPass,newPass:details.newPass})
          });
          if(response.status==400)
          window.alert("Wrong Roll Number");
          else
          window.alert("Password Change Successfully");
          
        }
        catch (error) {
         
          console.log (error);
        }
        setDetail({email:"",oldPass:"",newPass:""})
      }
      useEffect(()=>{
        document.title='Change Password';
      },[])
  return (
    <div>
       <div class="login-box">
      <div>
        <h2>CHANGE PASSWORD</h2>
        <form onSubmit={onsubmit}>
        <div class="user-box">
            <input type="old pass" name="email" value={details.email}  onChange={onchange}/>
            <label>UserName</label>
          </div>
          <div class="user-box">
            <input type="old pass" name="oldPass"  value={details.oldPass}  onChange={onchange} />
            <label>Old Password</label>
          </div>
          <div class="user-box">
            <input type="new pass" name="newPass"  value={details.newPass}  onChange={onchange} />
            <label>New Password</label>
          </div>
          <button class="button-1" type='submit'  className="btn btn-primary " data-bs-toggle="modal"
                  data-bs-target="#myModal" role="button" disabled={details.email==""||details.oldPass==""||details.newPass==""}>Change Password</button>
        </form>
      </div>
      </div>

    </div>
  )
}

export default Changepassword

