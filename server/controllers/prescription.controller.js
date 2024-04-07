import Prescription from './../models/prescription.model.js';

const addPrescription = async (req, res) => {
    try {
        const {PrescriptionID, firstName, lastName, age, contactNo, MedicationNames, units, notes } = req.body
        
        const newPrescription = new Prescription({
            PrescriptionID, firstName, lastName, age, contactNo, MedicationNames, units, notes
        })
        await newPrescription.save()
        res.status(200).json({success:true, message:'Prescription added successfully!', newPrescription})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getPrescription = async(req, res) => {
    try {
        const prescription = await Prescription.find()
        if(!prescription) {
            return res.status(404).json({success:false, message:'Prescription not found!'})
        }
        res.status(200).json({success:true, prescription})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updatePrescription = async(req, res) => {
    try {
        const PrescriptionID = req.params.id
        const updatePrescription = await Prescription.findByIdAndUpdate(PrescriptionID, req.body, {new:true})

        if(!updatePrescription) {
            return res.status(404).json({success:false, message:'Prescription not found!'})
        }
        res.status(200).json({success:true, message:'Prescription Updated Successfully!', updatePrescription})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deletePrescription = async (req, res) => {
    try {
        const PrescriptionID = req.params.id
        const deletePrescription = await Prescription.findByIdAndDelete(PrescriptionID)
        
        if(!deletePrescription) {
            return res.status(404).json({success:false, message:'Prescription not found!'})
        }
        res.status(200).json({success:true, message:'Prescription Deleted Successfully!', deletePrescription})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

export {addPrescription, getPrescription, updatePrescription, deletePrescription}