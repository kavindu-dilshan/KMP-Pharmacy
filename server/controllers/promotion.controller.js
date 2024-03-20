import Promotion from "../models/promotion.model.js"

const createPromotion = async (req, res) => {
    try {
        const {promotionID, couponCode, couponPrice, totalAmount, type, createdAt, expiredAt, status, description} = req.body
        
        const newPromotion = new Promotion({
            promotionID, couponCode, couponPrice, totalAmount, type, createdAt, expiredAt, status, description
        })
        await newPromotion.save()
        res.status(200).json({success:true, message:'Promotion created successfully!', newPromotion})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getPromotion = async(req, res) => {
    try {
        const promotion = await Promotion.find()
        if(!promotion) {
            return res.status(404).json({success:false, message:'Promotion not found!'})
        }
        res.status(200).json({success:true, promotion})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updatePromotion = async(req, res) => {
    try {
        const promotionId = req.params.id
        const updatePromotion = await Promotion.findByIdAndUpdate(promotionId, req.body, {new:true})

        if(!updatePromotion) {
            return res.status(404).json({success:false, message:'Promotion not found!'})
        }
        res.status(200).json({success:true, message:'Promotion Updated Successfully!', updatePromotion})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deletePromotion = async (req, res) => {
    try {
        const promotionId = req.params.id
        const deletePromotion = await Promotion.findByIdAndDelete(promotionId)
        
        if(!deletePromotion) {
            return res.status(404).json({success:false, message:'Promotion not found!'})
        }
        res.status(200).json({success:true, message:'Promotion Deleted Successfully!', deletePromotion})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

const getUpdatePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id)
        if(!promotion) {
            return res.status(404).json({success:false, message:'Promotion not found!'})
        }
        res.status(200).json({success:true, promotion})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

export {createPromotion, getPromotion, updatePromotion, deletePromotion, getUpdatePromotion}