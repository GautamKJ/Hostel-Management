const express= require("express");
const bcrypt=require('bcryptjs');
const Student=require('../Schema/student');
const Room=require("../Schema/rooms");
const jwt=require('jsonwebtoken');
const router=express.Router();

const {body,validationResult} =require('express-validator');
const fetchuser= require('../middleware/fetchuser');

router.post('/addroom', fetchuser, async (req,res)=>{
   
    
    try{
         // check whether this Student id already exist or not
        
    rm = new Room({
        room_no: req.body.room_no,
        hostel: req.body.hostel,
        
        room_type: req.body.room_type,
        room_ac: req.body.room_ac,
      });      
        
        const saveroom= await rm.save();
        res.json(saveroom);
    
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
})

router.post('/bookroom', fetchuser, async (req,res)=>{
   
    
    try{
        let user=await Student.findOne({roll_no:req.body.roll_no});
        
         if(!user){
             return res.status(400).json("Student does not exist");
         }
         if(user.room_no)
         return res.status(400).json("Room already exist");

         let room= await Room.find({room_no:req.body.room_no,hostel:req.body.hostel});
         console.log(room);
         const room_detail={};
         const std_detail={};
        console.log(room[0].occupant);
        room[0].occupant.push({
            roll_no:req.body.roll_no
        })
         
    std_detail.room_no=req.body.room_no;
    std_detail.hostel_no=req.body.hostel;

     room_detail.occupant=room[0].occupant;
            
        console.log(room_detail);
        console.log(room[0]._id);
            console.log("user  ",user);
    std=await Student.findByIdAndUpdate({_id:user._id},{$set:std_detail},{new :true});
    roombook= await Room.findByIdAndUpdate({_id:room[0]._id},{$set:room_detail},{new:true}) 
    res.json(roombook);
    
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
})
module.exports=router;
