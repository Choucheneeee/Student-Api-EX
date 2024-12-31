const express=require("express")
const studentroute=require("./routes/student.route")
const userroute=require("./routes/user.route")

const app=express()

app.use(express.urlencoded({ extended:true}))
app.use(express.json())

const cors = require('cors');
app.use(cors());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Request-Methods","*")
    res.setHeader("Access-Control-Request-Headers","*")
    res.setHeader("Access-Control-Allow-Methods","*")

     next()


})
app.use("/",studentroute)
app.use("/user",userroute)







app.listen(3000,()=>{console.log("server running on port 3000")})