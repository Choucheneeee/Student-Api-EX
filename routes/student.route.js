const route=require("express").Router()
const mod=require("../models/student.model")

route.get("/",(req,res)=>{
    mod.testConnect()
    .then((msg)=>{
        res.send(msg)
    }).catch((msg)=>{
        res.send(msg)
    })
})

route.post("/",(req,res)=>{
    const {name,age,email,phone}=req.body
    console.log("req body",req.body)
    console.log("name my",name)
    mod.postNewStudent(name,age,email,phone)
    .then((msg)=>{
        res.send(msg)
    }).catch((msg)=>{
        res.send(msg)
    })
})


module.exports=route