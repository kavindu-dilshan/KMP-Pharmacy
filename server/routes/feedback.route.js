import express from 'express'
import { createFeedback, getFeedback, updateFeedback, deleteFeedback } from '../controllers/feedback.controller.js'

const routers = express.Router()

routers.post('/create', createFeedback)
routers.get('/read', getFeedback)
routers.put('/update/:id', updateFeedback)
routers.delete('/delete/:id', deleteFeedback)

export default routers