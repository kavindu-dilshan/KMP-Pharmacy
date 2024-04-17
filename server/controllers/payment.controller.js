import Payment from "../models/payment.model.js"

const createpayment = async (req, res) => {
    try {
        const {firstname, lastname, email, phonenumber, address, city, postalcode, state} = req.body
        
        const newPayment = new Payment({
            firstname, lastname, email, phonenumber, address, city, postalcode, state
        })
        await newPayment.save()
        res.status(200).json({success:true, message:'Payment Information saved successfully!', newPayment})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getpayment = async(req, res) => {
    try {
        const payment = await Payment.find()
        if(!payment) {
            return res.status(404).json({success:false, message:'Payment info not found!'})
        }
        res.status(200).json({success:true, payment})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updatePayment = async(req, res) => {
    try {
        const paymentID = req.params.id
        const updatePayment = await Payment.findByIdAndUpdate(paymentID, req.body, {new:true})

        if(!updatePayment) {
            return res.status(404).json({success:false, message:'Payment info not found!'})
        }
        res.status(200).json({success:true, message:'Payment info updated successfully!', updatePayment})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deletePayment = async (req, res) => {
    try {
        const paymentID = req.params.id
        const deletePayment = await Payment.findByIdAndDelete(paymentID)
        
        if(!deletePayment) {
            return res.status(404).json({success:false, message:'Payment info not found!'})
        }
        res.status(200).json({success:true, message:'Payment info deleted successfully!', deletePayment})
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

export {createpayment, getpayment, updatePayment, deletePayment, getUpdatePayment}