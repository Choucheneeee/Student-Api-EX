const moong=require("mongoose")
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")

let schemaUser=moong.Schema({
    username:String,
    email:String,
    password:String,

})





var User=moong.model('user',schemaUser)
var url='mongodb://localhost:27017/FacApi'

exports.register=(username,email,password)=>{
    
    return new Promise((resolve,reject)=>{
        moong.connect(url)
        .then(()=>{
            User.findOne({email:email})
            .then((user)=>{
                if(user)
                    {
                        reject({message:'Email is already in use',status:400})
                        }
                        else{
                            bcrypt.hash(password,5)
                            .then((hpassword)=>{
                                const user=new User({
                                    username:username,
                                    email:email,
                                    password:hpassword
                                    })
                                    user.save()
                                    .then((doc)=>{
                                        moong.disconnect()
                                        resolve(doc)
                                    }).catch(()=>{
                                        moong.disconnect()
                                        reject("Error")
                                    }) 
                            })
                        }
                    }).catch((err)=>{
                        moong.disconnect()
                        reject(err)
                    })
                })
            })
        }

var privateKey="secret key"
exports.login=(email,password)=>{

    return new Promise((resolve,reject)=>{
        moong.connect(url)
                .then(()=>{
                    return User.findOne({email:email})
                    .then((user)=>{
                        if(!user)
                            {   
                                reject({message:'Email/Password is incorrect !',status:400})
                                moong.disconnect()

                                }
                                else{
                                    bcrypt.compare(password,user.password)
                                    .then((isMatch)=>{
                                        if(isMatch){
                                            let token=jwt.sign({
                                                id:user._id,
                                                username:user.username},privateKey,{
                                                expiresIn:'1h',
                                            })
                                            resolve(token)
                                            moong.disconnect()
                                        }
                                        else{
                                            reject({message:'Email/Passwordd is incorrect',status:400})
                                            moong.disconnect()
                                        }
                                        
                                        })
                                        .catch((err)=>{
                                            moong.disconnect()
                                            reject(err)
                                        })
                                        
                                            }
                                            })
                
                })
            })
        }
