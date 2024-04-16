import express from 'express';
import { addPrescription, getPrescription, updatePrescription, deletePrescription, getUpdatePrescription } from '../controllers/prescription.controller.js';

const routers = express.Router();


routers.post('/create', addPrescription)
routers.get('/read', getPrescription)
routers.put('/update/:id', updatePrescription)
routers.delete('/delete/:id', deletePrescription)
routers.get('/get/:id', getUpdatePrescription)


export default routers