import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
    PrescriptionID:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    contactNo:{
        type:Number
    },
    MedicationNames:{
        type:String
    },
    units:{
        type:Number
    },
    notes:{
        type:String
    }

}, {timestamps: true});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

export default Prescription;