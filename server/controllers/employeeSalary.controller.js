import EmployeeSalary from "../models/employeeSalary.model.js"

const addEmpoyeeSalary = async (req, res) => {
    try {
        const {empId, name, contactNo, DOB, address, email, NIC, empRole} = req.body
        
        const newEmployee = new EmployeeSalary({
            empId, name, contactNo, DOB, address, email, NIC, empRole
        })
        await newEmployee.save()
        res.status(200).json({success:true, message:'Employee added successfully!', newEmployee})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getEmployeeSalary = async(req, res) => {
    try {
        const employee = await EmployeeSalary.find()
        if(!employee) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, employee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updateEmployeeSalary = async(req, res) => {
    try {
        const empId = req.params.id
        const updateEmployee = await EmployeeSalary.findByIdAndUpdate(empId, req.body, {new:true})

        if(!updateEmployee) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, message:'Employee Updated Successfully!', updateEmployee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deleteEmployeeSalary = async (req, res) => {
    try {
        const empId = req.params.id
        const deleteEmployee = await EmployeeSalary.findByIdAndDelete(empId)
        
        if(!deleteEmployee) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, message:'Employee Deleted Successfully!', deleteEmployee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

const getUpdateEmployeeSalary = async (req, res) => {
    try {
        const employee = await EmployeeSalary.findById(req.params.id)
        if(!employee) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, employee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

export {addEmpoyeeSalary, getEmployeeSalary, updateEmployeeSalary, deleteEmployeeSalary, getUpdateEmployeeSalary}