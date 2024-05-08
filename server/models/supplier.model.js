import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplierID: {
        type: String,
        required: true,
        unique: true,
        match: /^SID\d{3,}$/,  //SID validation
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
    },
    contactNo: {
        type: Number,
        required: true,
    },
    NIC: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;
