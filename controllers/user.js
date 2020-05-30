const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt= require('bcryptjs');

router.get('/',(req,res)=>{
    res.render('user/index')
})


router.get('/create',  async (req,res)=>{
    userdata = await db.User.find({})
    res.render('user/newAcc' , {userdata : userdata})
})


router.post('/create', async (req,res)=>{
    try{
        
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


router.get('/login', (req,res)=>{
    res.render('user/login')
})


module.exports= router