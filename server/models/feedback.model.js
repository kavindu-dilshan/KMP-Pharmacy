import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    feedback:{
        type:String,
        required:true,
    },
    status:{
        type:String,
    },
},{timestamps:true})

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback