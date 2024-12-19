const express=require("express")
const app=express()
const studentroute=require("./routes/student.route")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/",studentroute)







app.listen(3000,()=>{console.log("server running on port 3000")})