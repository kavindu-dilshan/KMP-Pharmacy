import Feedback from "../models/feedback.model.js"

const createFeedback = async (req, res) => {
    try {
        const {name, email, rating, feedback, status} = req.body
        
        const newFeedback = new Feedback({
            name, email, rating, feedback, status
        })
        await newFeedback.save()
        res.status(200).json({success:true, message:'Feedback submited successfully!', newFeedback})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getFeedback = async(req, res) => {
    try {
        const feedback = await Feedback.find()
        if(!feedback) {
            return res.status(404).json({success:false, message:'Feedback not found!'})
        }
        res.status(200).json({success:true, feedback})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updateFeedback = async(req, res) => {
    try {
        const feedbackId = req.params.id
        const updateFeedback = await Feedback.findByIdAndUpdate(feedbackId, req.body, {new:true})

        if(!updateFeedback) {
            return res.status(404).json({success:false, message:'Feedback not found!'})
        }
        res.status(200).json({success:true, message:'Feedback Updated Successfully!', updateFeedback})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deleteFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id
        const deleteFeedback = await Feedback.findByIdAndDelete(feedbackId)
        
        if(!deleteFeedback) {
            return res.status(404).json({success:false, message:'Feedback not found!'})
        }
        res.status(200).json({success:true, message:'Feedback Deleted Successfully!', deleteFeedback})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}


export {createFeedback, getFeedback, updateFeedback, deleteFeedback}