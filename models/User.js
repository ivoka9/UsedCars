const mongoose = require('mongoose')





const userSchema = new mongoose.Schema({
    Username : {type: String , required:true , unique:true},
    Password : {type: String , minlength:3 , required:true},
    Phone: {type: Number , required: true , minlength:10 , maxlength:11 ,unique:true},
    car:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Car"
    }

});


module.exports=  mongoose.model('User',userSchema)