const mongoose = require('mongoose')

const MassageSchema = new mongoose.Schema({
    sender : {type:String },
    senderMsg: [{type:String}],
    senderDate:[{type:Number}],
    reciver: {type:String },
    reciverMsg:[{type:String}],
    reciverDate:[{type:Number}],
    senderAndReciver:{type:String, unique:true},
    story:[{type:Number}]

})


 const Massage =mongoose.model('Massage',MassageSchema)

 module.exports= Massage