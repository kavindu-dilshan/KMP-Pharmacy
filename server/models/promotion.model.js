import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    promotionID:{
        type:String,
        required:true,
        unique:true,
    },
    couponCode:{
        type:String,
        required:true,
        unique:true,
    },
    couponPrice:{
        type:String,
        required:true,
    },
    totalAmount:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
    },
    expiredAt:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Promotion = mongoose.model('Promotion', promotionSchema);

export default Promotion