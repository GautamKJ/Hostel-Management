const express= require("express");
const bcrypt=require('bcryptjs');
const Student=require('../Schema/student');
const Login= require("../Schema/login")
const jwt=require('jsonwebtoken');
const router=express.Router();
const Room=require("../Schema/rooms");
const {body,validationResult} =require('express-validator');
const fetchuser= require('../middleware/fetchuser');
const { findOne, find, findOneAndDelete } = require("../Schema/student");

const stdauth=require("../middleware/studentauth");
const staffauth=require("../middleware/staffauth");
const adminauth=require("../middleware/adminauth");

// Add Student


router.post('/addstudent',fetchuser, async (req,res)=>{
   
    
    try{
         // check whether this Student id already exist or not
    let user=await Student.findOne({roll_no:req.body.roll_no});
    if(user){
        return res.status(400).json("Student id already exist");
    }
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
     

    loginstd = new Login({
        email:req.body.roll_no,
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

       
        
    
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
  

 
})

// DELETE STUDENT

router.post('/deletestudent',  fetchuser,async (req,res)=>{
    const room_detail2={};
    
    try{
         // check whether this Student id already exist or not
    let user=await Student.findOne({roll_no:req.body.roll_no});
    if(!user){
        return res.status(400).json("Student does not exist");
    }
    
    
     email=req.body.roll_no;
     let user2= await Student.findOne({roll_no:req.body.roll_no});

        
     // Old Alloted Room database updated
     console.log("user2 ",user2);
    
     if(user2 && user2.room_no!=""){
        console.log("adsfasd");
     let newuseroldroom=await Room.find({room_no:user2.room_no,hostel:user2.hostel_no});
     console.log("---- ",newuseroldroom);
     for (var i = 0; i < newuseroldroom[0].occupant.length; i++) {
         if(newuseroldroom[0].occupant[i].roll_no==req.body.roll_no){
             newuseroldroom[0].occupant.splice(i, 1);
         break;
         }
     }
     room_detail2.occupant=newuseroldroom[0].occupant;
        await Room.findByIdAndUpdate({_id:newuseroldroom[0]._id},{$set:room_detail2},{new:true}) 
        console.log("====== ",newuseroldroom);
    }
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

// Fetch Student profile Details by roll no

router.post('/fetchstudentroll',  async (req,res)=>{
   
    try {
        let student= await Student.find({roll_no:req.body.roll_no});
        res.json(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})


// Fetch Student profile Details by roll no and hostel no

router.post('/fetchstudentstaff', fetchuser, async (req,res)=>{
   
    try {
        let student= await Student.find({roll_no:req.body.roll_no,hostel_no:req.body.hostel_no});
        res.json(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})





module.exports = router;