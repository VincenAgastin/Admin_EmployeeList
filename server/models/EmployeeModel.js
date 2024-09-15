const mongoose =require('mongoose')
const EmployeeSchema=new mongoose.Schema({
    employeename:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:[String],
        required:true
    },
    image:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const EmployeeModel=new mongoose.model('Employee',EmployeeSchema)

module.exports={EmployeeModel}