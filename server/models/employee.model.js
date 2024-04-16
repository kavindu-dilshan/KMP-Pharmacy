import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    empId:{
        type:String
    },
    name:{
        type:String
    },
    contactNo:{
        type:Number
    },
    DOB:{
        type:Date
    },
    address:{
        type:String
    },
    email:{
        type:String
    },
    NIC:{
        type:Number
    },
    empRole:{
        type:String
    },
    maritalStatus:{
        type:String
    },
    gender:{
        type:String
    }
},{timestamps:true})

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee