import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
    PrescriptionID:{
        type:String,
        required: true,
        unique: true,
    },
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    age:{
        type:Number,
        required: true,
    },
    contactNo:{
        type:Number,
        required: true,
    },
    MedicationNames:{
        type:String,
        required: true,
    },
    units:{
        type:Number,
        required: true,
    },
    notes:{
        type:String
    }

}, {timestamps: true});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

export default Prescription;

