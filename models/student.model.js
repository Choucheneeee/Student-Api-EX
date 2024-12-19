const moong=require("mongoose")

let schemaStudent=moong.Schema({
    name:String,
    age:Number,
    email:String,
    phone:Number

})

var Student=moong.model('student',schemaStudent)
var url='mongodb://localhost:27017/FacApi'

exports.testConnect=()=>{
    return new Promise((resolve,reject)=>{
        moong.connect(url)
        .then(()=>{
            const msg="Connected to database"
            moong.disconnect()
            console.log(msg)
            resolve(msg)
        })
    }).catch((msg)=>{
        
        console.log(msg)
    })
}
exports.postNewStudent=(name,age,email,phone)=>{
    
    return new Promise((resolve,reject)=>{
        moong.connect(url)
        .then(()=>{
            const student=new Student({
                name:name,
                age:age,
                email:email,
                phone:phone
                })
                console.log("student ",student)
                student.save().then((doc)=>{
                    moong.disconnect()
                    resolve(doc)
                }).catch(()=>{
                    moong.disconnect()
                    reject("Error")

                })   
        })
        
    }).catch((msg)=>{
        console.log(msg)
        reject(msg)
        
    })
}