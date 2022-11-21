const mongoose= require('mongoose');
const {Schema}=mongoose;
const roomSchema= new Schema({

  
    room_no:{

        type:String,
        required:true,
        
    },
    hostel:{
        type:String,
        required:true,
    },
    room_type:{
        type:String,
        required:true,
    },
    room_occupancy:{
        type:Number,
        required:true
    },
    room_ac:{
        type:String,
        required:true,
    },
    occupant:[{

       roll_no:{
        type:String, 
        default:"NaN"
       }

       
    }],
  
    Date:{
        type:Date,
        default:new Date()

    }

    
    
})

// Now, we need to export and create our Model. So call the module. exports and we want to export the mongoose model and we need to specify arguments to this model() method. The first argument is gonna be the name of the model. So let’s name our model as “Employee“, and the second argument is our Schema that is employeeSchema.

const Room=mongoose.model('room',roomSchema);;
Room.createIndexes();
module.exports=Room;

