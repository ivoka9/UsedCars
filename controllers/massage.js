const express = require('express')
const router = express.Router()
const db= require('../models')


router.post('/send/:who', async (req,res)=>{
    let currentChat,sender=false, SendAndRes
    
    SendAndRes= (String(req.body.sender) + String(req.body.reciver))
 
    if(req.params.who=="sender"){sender=true}
 
    const chat = {
        sender : req.body.sender,
        reciver: req.body.reciver,
        senderDate: Number(Date.now()),
        senderAndReciver :  SendAndRes,
        senderMsg: req.body.text,
        story: 1
    }
        db.Massage.create(chat,async (err,feedback)=>{
            
        if(err){
         currentChat = await db.Massage.find({senderAndReciver : chat.senderAndReciver})
            if(sender){
                currentChat[0].senderMsg.push(req.body.text)
                currentChat[0].senderDate.push(Date.now())
             }
            else{
                currentChat[0].reciverMsg.push(req.body.text)
                currentChat[0].reciverDate.push(Date.now())
            } 
            currentChat[0].story.push(1)
            currentChat[0].save()
            
         
        }
    })

    const user = await db.User.find({Username:req.body.reciver})
  
          

    res.redirect(`/massage/${req.body.sender}/${user[0]._id}`)})

router.get('/:send/:rec', async (req,res)=>{
  let rec =  await db.User.findById(req.params.rec)
    let context = {
        sender : req.params.send,
        reciver : rec.Username,
       chat : {
           story: [1]
       }
    }
    const sendAndRes= context.sender+context.reciver
    const chat =  await db.Massage.find({senderAndReciver: sendAndRes})
   
    try{
        if(chat[0].story){}
        
        context=chat[0]
    }
    catch{context.story =5}
    let main= {
        context : context,
        user : req.session
    }
    res.render('massage/index' , main)
})




module.exports= router