// notification.route.js
import express from 'express';
const router = express.Router();

// Sample notifications
const notifications = [
    { id: 1, message: 'New supply request created!' },
];

// Endpoint to fetch notifications
router.get('/api/notification', (req, res) => {
    res.json({ success: true, notifications });
});

export default router;
