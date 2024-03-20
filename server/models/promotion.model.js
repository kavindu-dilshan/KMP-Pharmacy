import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    promotionID:{
        type:String
    },
    couponCode:{
        type:String
    },
    couponPrice:{
        type:String
    },
    totalAmount:{
        type:String
    },
    type:{
        type:String
    },
    createdAt:{
        type:Date
    },
    expiredAt:{
        type:Date
    },
    status:{
        type:String
    },
    description:{
        type:String
    }
},{timestamps:true})

const Promotion = mongoose.model('Promotion', promotionSchema);

export default Promotion