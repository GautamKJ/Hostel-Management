const express= require("express");
const bcrypt=require('bcryptjs');
const Student=require('../Schema/student');
const Login= require("../Schema/login")
const jwt=require('jsonwebtoken');
const router=express.Router();

const {body,validationResult} =require('express-validator');
const fetchuser= require('../middleware/fetchuser');
const { findOne, find, findOneAndDelete } = require("../Schema/student");



// Add Student


router.post('/addstudent', fetchuser, async (req,res)=>{
   
    
    try{
         // check whether this Student id already exist or not
    let user=await Student.findOne({roll_no:req.body.roll_no});
    if(user){
        return res.status(400).json("Student id already exist");
    }
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
     

    loginstd = new Login({
        email:req.body.roll_no+"@lnmiit.ac.in",
        password:secPass
    });

    user = new Student({
            name: req.body.name,
            roll_no: req.body.roll_no,
            password:secPass,
            contact: req.body.contact,
            parent_contact: req.body.parent_contact,
            gender: req.body.gender,
            year: req.body.year
            
      });
      const stdlogin= await loginstd.save();
        const savestudent= await user.save();
        res.json(savestudent);

       
        // res.json(stdlogin);
    
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
  

 
})

// DELETE STUDENT

router.post('/deletestudent',  fetchuser,async (req,res)=>{
   
    
    try{
         // check whether this Student id already exist or not
    let user=await Student.findOne({roll_no:req.body.roll_no});
    if(!user){
        return res.status(400).json("Student does not exist");
    }
    
    
     email=req.body.roll_no+"@lnmiit.ac.in";
     
    student= await Student.findOneAndDelete({roll_no:req.body.roll_no}) ;

    console.log(req.body.roll_no,"  ",student);
    login= await Login.findOneAndDelete(email);
    res.json("Success : Student has been deleted" );
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
  
})

// Fetch Details

router.post('/fetchstudent', fetchuser, async (req,res)=>{
   
        try {
            let student= await Student.find({hostel_no:req.body.hostel_no}).sort({room_no:1});
            res.json(student);
        } catch (error) {
            console.error(error.message);
            res.status(500).json("Some error found");
        }
})


module.exports = router;