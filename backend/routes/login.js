const express= require("express");
const bcrypt=require('bcryptjs');
const Student=require('../Schema/student');
const Room=require("../Schema/rooms");
const User=require("../Schema/login");
const Department=require("../Schema/department");
const jwt=require('jsonwebtoken');
const router=express.Router();

const {body,validationResult} =require('express-validator');
const fetchuser= require('../middleware/fetchuser');
const JWT_SECRET=process.env.JWT_SECRET;
router.post('/login',[
 
  
    ],  async (req,res)=>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
      // retrive user from data base using email
    let user=await User.findOne({email:email});
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

  router.put('/changePassword',async (req,res)=>{
    const {email,oldPass,newPass}=req.body;
    let user=await User.findOne({email});
    if(!user){
        return res.status(404).send("Not found");
    }
   
    let passwordmatch=await bcrypt.compare(oldPass,user.password);
    if(!passwordmatch)
    return res.status(400).json("Please use right credentials to login.");
    
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(newPass,salt);
    
   const newCredential={};
   newCredential.password=secPass;
   
    com= await User.findByIdAndUpdate({_id:user._id},{$set:newCredential},{new:true}) 
    
    res.json(com);


})


// Get logged in user detail

router.post('/loggeduser',  async (req,res)=>{
   
  try {
      let user= await Department.find({email:req.body.email});
      res.json(user);
  } catch (error) {
      console.error(error.message);
      res.status(500).json("Some error found");
  }
})

router.post('/adddepartment', async (req,res)=>{
   
    
  try{
       // check whether this Student id already exist or not
  
  const salt= await bcrypt.genSalt(10);
  const secPass=await bcrypt.hash(req.body.password,salt);
   


  user = new Department({
          
          email: req.body.email,
          password:secPass,
          department: req.body.department,
          hostel: req.body.hostel,
        
          
    });
    loginstd = new User({
      email:req.body.email,
      password:secPass
  });
        await loginstd.save();
      const savestudent= await user.save();
      res.json(savestudent);

  
  }
  catch(errors){
      console.error(errors.message);
      res.status(500).json("Some error found");
  }



})



module.exports=router;