const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt= require('bcryptjs');

router.get('/',(req,res)=>{
    res.render('user/index')
})


router.get('/create', (req,res)=>{
    res.render('user/newAcc')
})


router.post('/create', async (req,res)=>{
    try{
        const user =await db.User.find({Username : req.body.username},)
        if(!user){return res.send("you have an acc")}
        const creatingUser = {
            Username : req.body.username,
            Password : req.body.password,
            Phone : req.body.phone
        }
        const newUser = await db.User.create(creatingUser)
        res.redirect('/')
    }
    catch(err){
        if(err){console.log(err)}
    }
})



module.exports= router