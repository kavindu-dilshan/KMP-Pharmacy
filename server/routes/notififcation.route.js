import express from 'express';
const router = express.Router();

// Mock notifications example
let notifications = [
    { id: 1, message: 'New supply request created!' },
    { id: 2, message: 'Supplier added successfully!' },
];

// Endpoint to fetch notifications
router.get('/api/notifications', (req, res) => {
    res.json({ success: true, notifications });
});

export default router;
