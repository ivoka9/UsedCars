const express = require('express')
const router = express.Router()
const db= require('../models')


router.post('/send/:who', async (req,res)=>{
    let currentChat,buyer=false, SendAndRes
    
    SendAndRes= (String(req.body.buyer) + String(req.body.seller))
 
    if(req.params.who=="buyer"){buyer=true}
 
    const chat = {
        story : [req.body.text,req.body.buyer,"buyer"] ,
        senderAndReciver :  SendAndRes,
    }
        db.Massage.create(chat,async (err,feedback)=>{
            
        if(err){
         currentChat = await db.Massage.find({senderAndReciver : chat.senderAndReciver})
            if(buyer){
               await currentChat[0].story.push(req.body.text)
               await currentChat[0].story.push(req.body.buyer)
               await currentChat[0].story.push("buyer")

             }
            else{
                await currentChat[0].story.push(req.body.text)
                await currentChat[0].story.push(req.body.seller)
                await currentChat[0].story.push("seller")

            } 
        
            currentChat[0].save()
            
         
        }
    })

    const user = await db.User.find({Username:req.body.seller})
  
          

    res.redirect(`/massage/${req.body.buyer}/${user[0]._id}`
    )})











router.get('/:buyer/:seller', async (req,res)=>{
 let seller=  await db.User.findById(req.params.seller)
 context= {
    buyer : req.session.currentUser.username  ,
    seller: seller.Username,
    user: req.session,
   
}

 let chat = await db.Massage.find({senderAndReciver : req.params.buyer+seller.Username})
 if(chat[0]){
    context.story = chat[0].story
 }

else{
context.story=1}


    res.render('massage/index' ,  context )
})




module.exports= router