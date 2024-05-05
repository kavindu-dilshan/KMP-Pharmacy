import express from 'express'
import { createPromotion, deletePromotion, getPromotion, updatePromotion, getUpdatePromotion, checkPromotionID, checkCouponCode } from '../controllers/promotion.controller.js'

const routers = express.Router()

routers.post('/create', createPromotion)
routers.get('/read', getPromotion)
routers.put('/update/:id', updatePromotion)
routers.delete('/delete/:id', deletePromotion)
routers.get('/get/:id', getUpdatePromotion)
routers.get('/check-unique-id', checkPromotionID);
routers.get('/check-unique-code', checkCouponCode);

export default routers