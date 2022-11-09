const mongoose= require('mongoose');
const {Schema}=mongoose;
const studentSchema= new Schema({

    name:{
        type:String,
        required:true
    },
    roll_no:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true

    },
    contact:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    parent_contact:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    gender:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    room_no:{
        type:String,
        default:""
    },
    hostel_no:{
        type:String,
        default:""
    },
    date:{
        type:Date,
        default:new Date
        
    }

})

// Now, we need to export and create our Model. So call the module. exports and we want to export the mongoose model and we need to specify arguments to this model() method. The first argument is gonna be the name of the model. So let’s name our model as “Employee“, and the second argument is our Schema that is employeeSchema.

const User=mongoose.model('student',studentSchema);;
User.createIndexes();
module.exports=User;

