import Employee from "../models/employee.model.js"

const addEmpoyee = async (req, res) => {
    try {
        const {empId, firstName, lastName, DOB, gender, email, contactNo, NIC, address, empType, qualifications} = req.body
        
        const newEmployee = new Employee({
            empId, firstName, lastName, DOB, gender, email, contactNo, NIC, address, empType, qualifications
        })
        await newEmployee.save()
        res.status(200).json({success:true, message:'Employee added successfully!', newEmployee})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getEmployee = async(req, res) => {
    try {
        const employee = await Employee.find()
        if(!employee) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, employee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updateEmployee = async(req, res) => {
    try {
        const empId = req.params.id
        const updateEmployee = await Employee.findByIdAndUpdate(empId, req.body, {new:true})

        if(!updateEmployee) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, message:'Employee Updated Successfully!', updateEmployee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const empId = req.params.id
        const deleteEmployee = await Employee.findByIdAndDelete(empId)
        
        if(!deleteEmployee) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, message:'Employee Deleted Successfully!', deleteEmployee})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

export {addEmpoyee, getEmployee, updateEmployee, deleteEmployee}