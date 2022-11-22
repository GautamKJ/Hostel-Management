const mongoose= require('mongoose');
const {Schema}=mongoose;
const loginSchema= new Schema({

  
    email:{

        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    }

    
})

// Now, we need to export and create our Model. So call the module. exports and we want to export the mongoose model and we need to specify arguments to this model() method. The first argument is gonna be the name of the model. So let’s name our model as “Employee“, and the second argument is our Schema that is employeeSchema.

const User=mongoose.model('user',loginSchema);;
User.createIndexes();
module.exports=User;

