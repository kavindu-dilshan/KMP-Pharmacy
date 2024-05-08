import EmployeeLeave from "../models/employeeLeave.model.js"

const addEmpoyeeLeave = async (req, res) => {
    try {
        const {empId, name, contactNo, DOB, address, email, NIC, empRole} = req.body
        
        const newEmployee = new EmployeeLeave({
            empId, name, contactNo, DOB, address, email, NIC, empRole
        })
        await newEmployee.save()
        res.status(200).json({success:true, message:'Leave added successfully!', newEmployee})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getEmployeeLeave = async(req, res) => {
    try {
        const employee = await EmployeeLeave.find()
        if(!employee) {
            return res.status(404).json({success:false, message:'Leave not found!'})
        }
        res.status(200).json({success:true, employee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updateEmployeeLeave = async(req, res) => {
    try {
        const empId = req.params.id
        const updateEmployee = await EmployeeLeave.findByIdAndUpdate(empId, req.body, {new:true})

        if(!updateEmployee) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, message:'Leave Updated Successfully!', updateEmployee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deleteEmployeeLeave = async (req, res) => {
    try {
        const empId = req.params.id
        const deleteEmployee = await EmployeeLeave.findByIdAndDelete(empId)
        
        if(!deleteEmployee) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, message:'Leave Deleted Successfully!', deleteEmployee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

const getUpdateEmployeeLeave = async (req, res) => {
    try {
        const employee = await EmployeeLeave.findById(req.params.id)
        if(!employee) {
            return res.status(404).json({success:false, message:'Leave not found!'})
        }
        res.status(200).json({success:true, employee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

export {addEmpoyeeLeave, getEmployeeLeave, updateEmployeeLeave, deleteEmployeeLeave, getUpdateEmployeeLeave}