const express=require('express');
const database = require('./db');
require("dotenv").config();
const jwt = require('jsonwebtoken');
var cors = require('cors');
const port= process.env.PORT || 8081;
const path=require("path");
var app= express();
database();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'my-app', 'build')));
app.use(cors());
app.use('/api/', require('./routes/student'));
app.use('/api/', require('./routes/room'));
app.use('/api/', require('./routes/complain'));
app.use('/api/', require('./routes/sendemail'));
app.use('/api/', require('./routes/login'));



app.get("*",(req,res)=>{
    const _path = path.resolve(__dirname,'my-app','build','index.html') ;
    console.log(_path);
    res.sendFile(_path);
});
app.listen(port, function () {
 
    console.log("Example app listening at http://localhost:",port);
 })
 

