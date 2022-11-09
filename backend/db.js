const mongoose= require('mongoose');
const mongoURI="mongodb://localhost:27017/hostelManagement2";
const database= ()=>{
     mongoose.connect(mongoURI,()=>{
        console.log("Database connected........");
    });

}

module.exports=database;