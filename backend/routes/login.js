const express= require("express");
const bcrypt=require('bcryptjs');
const Student=require('../Schema/student');
const Room=require("../Schema/rooms");
const User=require("../Schema/login");
const jwt=require('jsonwebtoken');
const router=express.Router();

const {body,validationResult} =require('express-validator');
const fetchuser= require('../middleware/fetchuser');
const JWT_SECRET=process.env.JWT_SECRET;
router.post('/login',[
 
    body('email',"Enter the valid Email").isEmail(),
  body('password',"Password can't be blank").exists(),
    ],  async (req,res)=>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
      // retrive user from data base using email
    let user=await User.findOne({email});
    if(!user){
        return res.status(400).json("Please use right credential to login.");
    }
   
    let passwordmatch=await bcrypt.compare(password,user.password);
    console.log(passwordmatch);
    if(!passwordmatch)
      return res.status(400).json("Please use right credentials to login.");
  
      const data={
        user:{
          id: user.id
        }
      }
      var token = jwt.sign(data, JWT_SECRET);
      
    res.json({token});
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
  
  
  
  })

  router.put('/changePassword',fetchuser,async (req,res)=>{
    const {email,oldPass,newPass}=req.body;
    let user=await User.findOne({email});
    if(!user){
        return res.status(404).send("Not found");
    }
   
    let passwordmatch=await bcrypt.compare(oldPass,user.password);
    if(!passwordmatch)
    return res.status(400).json("Please use right credentials to login.");
    
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(oldPass,salt);
    
   const newCredential={};
   newCredential.password=secPass;
   
    com= await User.findByIdAndUpdate({_id:user._id},{$set:newCredential},{new:true}) 
    
    res.json(com);


})

module.exports=router;