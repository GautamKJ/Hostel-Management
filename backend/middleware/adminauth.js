const jwt=require('jsonwebtoken');
const User=require('../Schema/login');
require("dotenv").config();
const JWT_SECRET=process.env.JWT_SECRET;
const fetchuser=async(req,res,next)=>{
   
    try{
    
    let cmp=  await User.findOne({_id:req.user.id});
    console.log("CMP ",cmp);
    if(cmp.department!='Admin'){
        console.log("here");
        return res.status(400).json("Access denied");
    }
      console.log("adf");
    next();
    }
    catch(error){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports=fetchuser;