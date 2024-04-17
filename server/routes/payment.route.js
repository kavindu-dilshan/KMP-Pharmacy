import express from 'express';
import { addPayment, getPayment, updatePayment, deletePayment, getUpdatePayment } from '../controllers/payment.controller.js';

const routers = express.Router();


routers.post('/create', addPayment)
routers.get('/read', getPayment)

routers.put('/update/:id', updatePayment)
routers.delete('/delete/:id', deletePayment)
routers.get('/get/:id', getUpdatePayment)

export default routers