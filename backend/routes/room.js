const express= require("express");
const bcrypt=require('bcryptjs');
const Student=require('../Schema/student');
const Room=require("../Schema/rooms");
const jwt=require('jsonwebtoken');
const router=express.Router();

const {body,validationResult} =require('express-validator');
const fetchuser= require('../middleware/fetchuser');

const stdauth=require("../middleware/studentauth");
const staffauth=require("../middleware/staffauth");
const adminauth=require("../middleware/adminauth");
router.post('/addroom',async (req,res)=>{
   
    
    try{
         // check whether this Student id already exist or not
        
    rm = new Room({
        room_no: req.body.room_no,
        hostel: req.body.hostel,
        room_occupancy:req.body.room_occupancy,
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
// room occupancy check



router.post('/bookroom',fetchuser, async (req,res)=>{
   
    
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


router.put('/updateroom',fetchuser, async (req,res)=>{
    const {oldrollno,newrollno}=req.body;
    try {
        const room_detail1={};
        const room_detail2={};
        const std_detail1={};
        const std_detail2={};
        // New Alloted Room database updated
        let room= await Room.find({_id:req.body._id});
        if(room){
        for (var i = 0; i < room[0].occupant.length; i++) {
            if(room[0].occupant[i].roll_no==oldrollno){
            room[0].occupant[i].roll_no=newrollno;
            break;
            }
        }
        room_detail1.occupant=room[0].occupant;
        await Room.findByIdAndUpdate({_id:room[0]._id},{$set:room_detail1},{new:true}) 
    }

    console.log("asjd ",oldrollno," ",newrollno);

        // Student database
        // old roll no
        let user1=await Student.findOne({roll_no:req.body.oldrollno});
        let user2= await Student.findOne({roll_no:req.body.newrollno});

        
        // Old Alloted Room database updated
        console.log("user2 ",user2);
       let resp;
        if(user2.length>0 && user2.room_no!=""){
        let newuseroldroom=await Room.find({room_no:user2.room_no,hostel:user2.hostel_no});
   
        for (var i = 0; i < newuseroldroom[0].occupant.length; i++) {
            if(newuseroldroom[0].occupant[i].roll_no==newrollno){
                newuseroldroom[0].occupant.splice(i, 1);
            break;
            }
        }
    
        room_detail2.occupant=newuseroldroom[0].occupant;
        resp=   await Room.findByIdAndUpdate({_id:newuseroldroom[0]._id},{$set:room_detail2},{new:true}) 
    
}
        
        std_detail1.room_no="";
        std_detail2.room_no=room[0].room_no;
        await Student.findByIdAndUpdate({_id:user1._id},{$set:std_detail1},{new :true});
    std=    await Student.findByIdAndUpdate({_id:user2._id},{$set:std_detail2},{new :true});
    
  
        res.json(resp);


    
        

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
   


})

router.post('/fetchroomdetailwithid', fetchuser, async (req,res)=>{
   
    try {
        let room= await Room.find({_id:req.body._id});
        res.json(room);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})

router.post('/fetchroom',fetchuser,async(req,res)=>{
    try {
        let room= await Room.find({hostel:req.body.hostel,room_type:req.body.room_type,room_ac:req.body.room_ac});
        res.json(room);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})

router.post('/fetchhostelroom',fetchuser, async(req,res)=>{
    try {
        let room= await Room.find({hostel:req.body.hostel}).sort({room_no:1});
        res.json(room);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})


// fetch particular room details
router.post('/fetchparticularroom',fetchuser,async(req,res)=>{
    try {
        let room= await Room.find({hostel:req.body.hostel,room_no:req.body.room_no});
        res.json(room);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})

module.exports=router;
