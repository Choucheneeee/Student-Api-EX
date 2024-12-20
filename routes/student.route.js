const route=require("express").Router()
const mod=require("../models/student.model")
const jwt=require("jsonwebtoken")

var privateKey="secret key"

verifyToken=(req,res,next)=>{
    let token=req.headers.authorization
    if(!token){
        return res.status(403).send({message:"Any token provided  .... !"})
    }
    try{
        console.log("token:",token)
        jwt.verify(token,privateKey)
        next()
    }
    catch(err){
        return res.status(401).send({message:"Invalid Token !"})
}
}


route.post("/",verifyToken,async (req,res)=>{
    const {name,age,email,phone}= req.body
    console.log("req body",req.body)
    console.log("name my",name)
    mod.postNewStudent(name,age,email,phone)
    .then((msg)=>{
        res.send(msg)
    })
    .catch((validation)=>{
        console.log("msg valid",validation)
        res.json(validation)
    })
})

secretKey="chouchene"
clientKey="0000"

verifySecretClient=(req,res,next)=>{
    let sk=req.params.secret
    let ck=req.params.client
    if (sk==secretKey && ck==clientKey){
        next()
    }
    else{

        res.json({err:'invalide secret key and client key'})
    }
}

route.get("/students",verifyToken,(req,res)=>{
        mod.getStudents()
        .then((msg)=>{
            res.send(msg)
            }).catch((msg)=>{
                res.send(msg)
                })
   
})
route.get("/student/:id",verifyToken,(req,res)=>{
    const id=req.params.id
    console.log("id",id)
    mod.getOneStudent(id)
    .then((msg)=>{
        res.send(msg)
        }).catch((msg)=>{
            res.send(msg)
            })
})
route.delete("/student/:id",verifyToken,(req,res)=>{
    const id=req.params.id
    console.log("id",id)
    mod.deleteOneStudent(id)
    .then((msg)=>{
        res.send(msg)
        }).catch((msg)=>{
            res.send(msg)
            })
})
route.patch("/student/:id",verifyToken,(req,res)=>{
    const id=req.params.id
    const {name,age,email,phone}= req.body
    mod.updateOneStudent(id,name,age,email,phone)
    .then((msg)=>{
        res.send(msg)
        }).catch((msg)=>{
            res.send(msg)
            })
})





module.exports=route