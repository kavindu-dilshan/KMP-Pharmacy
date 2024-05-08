import mongoose from "mongoose";

const employeeLeaveSchema = new mongoose.Schema({
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
    }
},{timestamps:true})

const EmployeeLeave = mongoose.model('EmployeeLeave', employeeLeaveSchema);

export default EmployeeLeave