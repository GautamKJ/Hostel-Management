const mongoose= require('mongoose');
const {Schema}=mongoose;
const complainSchema= new Schema({

  
    dept:{
        type:String,
        required:true,

    },
    complain_desc:{
        type:String,
        required:true

    },
    complain_status:{
        type:String,
        required:true

    },
    room_no:{
        type:String,
        required:true
    },
    hostel_no:{
        type:String,
        required:true
    },
    roll_no:{
        type:String,
        required:true

    },

    date:{
        type:Date,
        default:new Date()
        
    }

})

// Now, we need to export and create our Model. So call the module. exports and we want to export the mongoose model and we need to specify arguments to this model() method. The first argument is gonna be the name of the model. So let’s name our model as “Employee“, and the second argument is our Schema that is employeeSchema.

const comp=mongoose.model('complains',complainSchema);;
comp.createIndexes();
module.exports=comp;

