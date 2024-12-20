const express=require("express")
const studentroute=require("./routes/student.route")
const userroute=require("./routes/user.route")

const app=express()

app.use(express.urlencoded({ extended:true}))
app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Request-Method","*")
    res.setHeader("Access-Control-Request-Headers","authorization")
     next()


})
app.use("/",studentroute)
app.use("/user",userroute)







app.listen(3000,()=>{console.log("server running on port 3000")})