import express from 'express';
import { addSupplyRequest, getSupplyRequest, deleteSupplyRequest } from '../controllers/supplyRequest.controller.js';

const router = express.Router();

// Route to add a new supply request
router.post('/create', addSupplyRequest);

// Route to get all supply requests
router.get('/read', getSupplyRequest);

// Route to delete a specific supply request by ID
router.delete('/delete/:id', deleteSupplyRequest);

export default router;
