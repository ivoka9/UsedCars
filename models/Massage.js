const mongoose = require('mongoose')

const MassageSchema = new mongoose.Schema({

    senderAndReciver:{type:String, unique:true},
    story:[{type:String}]

})


 const Massage =mongoose.model('Massage',MassageSchema)

 module.exports= Massage