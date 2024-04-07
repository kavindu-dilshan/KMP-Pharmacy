import express from 'express';
import { addPrescription, getPrescription, updatePrescription, deletePrescription } from '../controllers/prescription.controller.js';

const routers = express.Router();


routers.post('/create', addPrescription)
routers.get('/read', getPrescription)
routers.put('/update/:id', updatePrescription)
routers.delete('/delete/:id', deletePrescription)

export default routers