import Supplier from './../models/supplier.model.js';

const addSupplier = async (req, res) => {
    try {
        const {supplierID, firstName, lastName, DOB,  email, contactNo, NIC, address } = req.body
        
        const newSupplier = new Supplier({
            supplierID, firstName, lastName, DOB, email, contactNo, NIC, address
        })
        await newSupplier.save()
        res.status(200).json({success:true, message:'Supplier added successfully!', newSupplier})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getSupplier = async(req, res) => {
    try {
        const supplier = await Supplier.find()
        if(!supplier) {
            return res.status(404).json({success:false, message:'Supplier not found!'})
        }
        res.status(200).json({success:true, supplier})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updateSupplier = async(req, res) => {
    try {
        const supplierID = req.params.id
        const updateSupplier = await Supplier.findByIdAndUpdate(supplierID, req.body, {new:true})

        if(!updateSupplier) {
            return res.status(404).json({success:false, message:'Supplier not found!'})
        }
        res.status(200).json({success:true, message:'Supplier Updated Successfully!', updateSupplier})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deleteSupplier = async (req, res) => {
    try {
        const supplierID = req.params.id
        const deleteSupplier = await Supplier.findByIdAndDelete(supplierID)
        
        if(!deleteSupplier) {
            return res.status(404).json({success:false, message:'Supplier not found!'})
        }
        res.status(200).json({success:true, message:'Supplier Deleted Successfully!', deleteSupplier})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

const getUpdateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id)
        if(!supplier) {
            return res.status(404).json({success:false, message:'Supplier not found!'})
        }
        res.status(200).json({success:true, supplier})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

export {addSupplier, getSupplier, updateSupplier, deleteSupplier, getUpdateSupplier}