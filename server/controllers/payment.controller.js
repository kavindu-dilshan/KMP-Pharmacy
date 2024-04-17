import Payment from "../models/payment.model.js"

const addPayment = async (req, res) => {
    try {
        const {firstName, lastName, NIC, email, phoneNumber, address, city, postalCode, state} = req.body
        
        const newPayment = new Payment({
            firstName, lastName, NIC, email, phoneNumber, address, city, postalCode, state
        })
        await newPayment.save()
        res.status(200).json({success:true, message:'Payment created successfully!', newPayment})

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getPayment = async(req, res) => {
    try {
        const payment = await Payment.find()
        if(!payment) {
            return res.status(404).json({success:false, message:'Payment not found!'})
        }
        res.status(200).json({success:true, payment})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updatePayment = async(req, res) => {
    try {
        const NIC = req.params.id
        const updatePayment = await Payment.findByIdAndUpdate(NIC, req.body, {new:true})

        if(!updatePayment) {
            return res.status(404).json({success:false, message:'Payment not found!'})
        }
        res.status(200).json({success:true, message:'Payment Updated Successfully!', updatePayment})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deletePayment = async (req, res) => {
    try {
        const NIC = req.params.id
        const deletePayment = await Payment.findByIdAndDelete(NIC)
        
        if(!deletePayment) {
            return res.status(404).json({success:false, message:'Payment not found!'})
        }
        res.status(200).json({success:true, message:'Payment Deleted Successfully!', deletePayment})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

const getUpdatePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
        if(!payment) {
            return res.status(404).json({success:false, message:'Payment not found!'})
        }
        res.status(200).json({success:true, payment})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

export {addPayment, getPayment, updatePayment, deletePayment, getUpdatePayment}
