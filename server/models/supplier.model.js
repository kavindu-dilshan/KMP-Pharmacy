import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplierID:{
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
    }

}, {timestamps: true});

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;