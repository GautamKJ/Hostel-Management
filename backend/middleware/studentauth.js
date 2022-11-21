
const User=require('../Schema/login');
require("dotenv").config();

const fetchuser=async(req,res,next)=>{
  
    try{
   
    let cmp=  User.findOne({_id:req.user.id});
    if(cmp.department!='Student'){
        return res.status(400).json("Access denied");
    }
      
    next();
    }
    catch(error){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports=fetchuser;