import express from 'express';
import { addSupplier, getSupplier, updateSupplier, deleteSupplier } from '../controllers/supplier.controller.js';

const routers = express.Router();


routers.post('/create', addSupplier)
routers.get('/read', getSupplier)
routers.put('/update/:id', updateSupplier)
routers.delete('/delete/:id', deleteSupplier)

export default routers