const path = require('path');
const express = require('express');
const fetchuser= require('../middleware/fetchuser');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const router=express.Router();
app.use(cors())
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath)); 
 

const adminauth=require("../middleware/adminauth");
router.post('/sendmail',fetchuser,(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '20ucs072@lnmiit.ac.in',
          pass: 'gautam@kr'
        }
    });
 
    var mailOptions = {
        from: '20ucs072@lnmiit.ac.in',// sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text:req.body.description,
        html: `
        <div >
     
            <li >Message: ${req.body.description}</li>
       
        `
    };
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});
 
module.exports=router;