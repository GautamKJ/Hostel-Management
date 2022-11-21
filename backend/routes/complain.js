const express= require("express");
const bcrypt=require('bcryptjs');
const Student=require('../Schema/student');
const Room=require("../Schema/rooms");
const Complain=require("../Schema/complain");
const jwt=require('jsonwebtoken');
const router=express.Router();

const {body,validationResult} =require('express-validator');
const fetchuser= require('../middleware/fetchuser');
const stdauth=require("../middleware/studentauth");
const staffauth=require("../middleware/staffauth");



router.post('/addcomplain', fetchuser, async (req,res)=>{
   
    
    try{
         
        
    comp = new Complain({
        dept:req.body.dept,
        comp_id:req.body.comp_id,
        complain_desc:req.body.complain_desc,
        room_no:req.body.room_no,
        hostel_no:req.body.hostel_no,
        roll_no:req.body.roll_no
        
      });      
        console.log(comp);
        const savecomplains= await comp.save();
        res.json(savecomplains);
    
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
})

router.post('/fetchcomplain',fetchuser, async (req,res)=>{
   
    try {
        let cmp= await Complain.find({roll_no:req.body.roll_no}).sort({Date:1});
        res.json(cmp);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})


router.post('/fetchhostelcomplain', fetchuser,async (req,res)=>{
   
    try {
        let cmp= await Complain.find({hostel_no:req.body.hostel_no}).sort({Date:1});
        res.json(cmp);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})

router.post('/fetchcomplainid', fetchuser, async (req,res)=>{
   
    try {
        let cmp= await Complain.find({_id:req.body._id});
        res.json(cmp);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})


router.put('/updatecomplain/:id',fetchuser,async (req,res)=>{
    try{
    const {complain_status}=req.body;
    const newcomplain={};
    if(complain_status){newcomplain.complain_status=complain_status};
    
    let comp= await Complain.findById(req.params.id);
    if(!comp){
        return res.status(404).send("Not found");
    }
   

    com= await Complain.findByIdAndUpdate(req.params.id,{$set:newcomplain},{new:true}) 
    
    res.json(com);
    }
    catch(error){
        console.log(error);
    }

})


module.exports=router;