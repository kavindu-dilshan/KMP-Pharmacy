import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    empId:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    DOB:{
        type:Date
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    contactNo:{
        type:Number
    },
    NIC:{
        type:Number
    },
    address:{
        type:String
    },
    empType:{
        type:String
    },
    qualifications:{
        type:String
    }
},{timestamps:true})

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee