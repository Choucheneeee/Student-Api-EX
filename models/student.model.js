const moong=require("mongoose")
const Joi=require("joi")
const schemaValidation = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z]+$/) // Allows only alphabetic characters
      .min(2)
      .max(20)
      .required(),
    age: Joi.number().integer().min(1).max(120).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string() // Use a string to validate the phone number format
      .required(),
  });

moong.connect('mongodb://localhost:27017/FacApi', {
   
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit if connection fails
  });


let schemaStudent=moong.Schema({
    name:String,
    age:Number,
    email:String,
    phone:Number

})

var Student=moong.model('student',schemaStudent)
var url='mongodb://localhost:27017/FacApi'


exports.postNewStudent=(name,age,email,phone)=>{
    
    return new Promise((resolve,reject)=>{
        moong.connect(url)
        .then(async()=>{
            const validation = await schemaValidation.validateAsync({ name, age, email, phone });
                if (validation.error) {
                    reject(validation.error.details[0].message)
                }
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
        
    })
}



exports.getStudents = async () => {
    try {
        await moong.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const students = await Student.find();
        moong.disconnect();
        return students;
    } catch (err) {
        moong.disconnect();
        console.error("Error fetching students:", err);
        throw new Error("Error fetching students");
    }
};

exports.getOneStudent = async (id) => {
    try {
        await moong.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const student = await Student.findOne({ _id: id });
        moong.disconnect();
        console.log("One Student found:", student);
        return student;
    } catch (err) {
        moong.disconnect();
        console.error("Error fetching one student:", err);
        throw new Error("Error fetching one student");
    }
};

exports.deleteOneStudent=(id)=>{
    return new Promise((resolve,reject)=>{
        moong.connect(url)
        .then(()=>{
            return Student.deleteOne({_id:id})
            .then((doc)=>{
                    moong.disconnect()
                    resolve("Student Deleted Succefully")
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
exports.updateOneStudent=(id,name,age,email,phone)=>{
    return new Promise((resolve,reject)=>{
        moong.connect(url)
        .then(()=>{
            return Student.updateOne({_id:id},{name,age,email,phone})
            .then(async()=>{
                    const st= await Student.findOne({_id:id})
                    .then((st)=>{
                        console.log(st,'student')
                        resolve(st)
                        moong.disconnect()

                    })
                }).catch((err)=>{
                    console.log(err)
                    moong.disconnect()
                    reject("Error")

                })   
        })
        
    }).catch((msg)=>{
        console.log(msg)
        reject(msg)
        
    })
}


