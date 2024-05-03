import SupplyRequest from '../models/supplyRequest.model.js';
import { broadcast } from '../websocket.js'; // Import broadcast function for notifications

const addSupplyRequest = async (req, res) => {
    try {
        const { medicineName, quantity, supplier } = req.body;
        const newRequest = new SupplyRequest({ medicineName, quantity, supplier });
        await newRequest.save();

        // Broadcasting via WebSocket
        broadcast(
            wss,
            JSON.stringify({
                type: 'newSupplyRequest',
                message: `New supply request for ${medicineName} by ${supplier}`,
            })
        );

        res.status(201).json({
            success: true,
            message: 'Supply request created successfully!',
            newRequest,
        });
    } catch (error) {
        console.error('Error creating supply request:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


const getSupplyRequest = async (req, res) => {
    try {
        const requests = await SupplyRequest.find();
        res.status(200).json({
            success: true,
            requests,
        });
    } catch (error) {
        console.error('Error fetching supply requests:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


const deleteSupplyRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRequest = await SupplyRequest.findByIdAndDelete(id);

        if (!deletedRequest) {
            return res.status(404).json({
                success: false,
                message: 'Supply request not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Supply request deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting supply request:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export { addSupplyRequest, getSupplyRequest, deleteSupplyRequest };
