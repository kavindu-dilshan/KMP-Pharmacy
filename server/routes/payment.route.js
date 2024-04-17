import express from 'express'
import {createpayment, getpayment, updatePayment, deletePayment,getUpdatePayment} from '../controllers/payment.controller.js'

const routers = express.Router()

routers.post('/create', createpayment)
routers.get('/read', getpayment)
routers.put('/update/:id', updatePayment)
routers.delete('/delete/:id', deletePayment)
routers.get('/get/:id', getUpdatePayment)

export default routers