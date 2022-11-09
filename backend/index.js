const express=require('express');
const database = require('./db');
const jwt = require('jsonwebtoken');
const port=8081;
var app= express();
database();
app.use(express.json());

app.use('/api/', require('./routes/student'));
app.use('/api/', require('./routes/room'));
app.use('/api/', require('./routes/complain'));
app.use('/api/', require('./routes/login'));
app.listen(port, function () {
 
    console.log("Example app listening at http://localhost:",port);
 })
 

