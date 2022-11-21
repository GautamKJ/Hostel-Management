const jwt=require('jsonwebtoken');
const User=require('../Schema/login');
require("dotenv").config();
const JWT_SECRET=process.env.JWT_SECRET;
const fetchuser=async(req,res,next)=>{
    
    try{
    
    
    let cmp=  User.findOne({_id:req.user.id});
    console.log("data ",cmp);
    if(cmp.department!='Staff'){
        return res.status(400).json("Access denied");
    }
      
    next();
    }
    catch(error){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports=fetchuser;