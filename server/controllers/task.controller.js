import Task from "../models/task.model.js"

const createTask = async (req, res) => {
    try {
        const {orderId, cusName, cusAddress, deliDate, assignDriv, deliStatus} = req.body
        const newTask = new Task({
            orderId, cusName, cusAddress, deliDate, assignDriv, deliStatus
        })
        await newTask.save()
        res.status(200).json({success:true, message:'Task created successfully!', newTask})
} catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getTask = async(req, res) => {
    try {
        const task = await Task.find()
        if(!task) {
            return res.status(404).json({success:false, message:'Task not found!'})
        }
        res.status(200).json({success:true, task})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }

}

const updateTask = async(req, res) => {
    try {
        const orderId = req.params.id
        const updateTask = await Task.findByIdAndUpdate(orderId, req.body, {new:true})

        if(!updateTask) {
            return res.status(404).json({success:false, message:'Task not found!'})
        }
        res.status(200).json({success:true, message:'Task Updated Successfully!', updateTask})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deleteTask = async (req, res) => {
    try {
        const orderId = req.params.id
        const deleteTask = await Task.findByIdAndDelete(orderId)
        
        if(!deleteTask) {
            return res.status(404).json({success:false, message:'Task not found!'})
        }
        res.status(200).json({success:true, message:'Task Deleted Successfully!', deleteTask})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

const getUpdateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task) {
            return res.status(404).json({success:false, message:'Task not found!'})
        }
        res.status(200).json({success:true, task})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

const checkOrderID = async (req, res) => {
    const { orderId } = req.query; 

    try {
        const existingOrder = await Task.findOne({ orderId });
        if (existingOrder) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { createTask, getTask, updateTask, deleteTask, getUpdateTask,checkOrderID }