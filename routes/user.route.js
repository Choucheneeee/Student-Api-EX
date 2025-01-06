const route=require("express").Router()
const user=require("../models/user.model")


route.post("/register",async (req,res)=>{
    const {username,email,password}= req.body
    user.register(username,email,password)
    .then((msg)=>{
        res.send(msg)
    }).catch((msg)=>{
        res.send(msg)
    })
})

route.post("/login",async (req,res)=>{
    const {email,password}= req.body
    user.login(email,password)
    .then((token)=>{
        res.json({token:token})
    }).catch((msg)=>{
        res.send(msg)
    })
})






module.exports=route
