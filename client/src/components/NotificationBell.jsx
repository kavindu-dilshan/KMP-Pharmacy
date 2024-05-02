import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdNotifications } from 'react-icons/md'; // Bell icon
import { useNavigate } from 'react-router-dom'; // For redirection
import { toast } from 'react-hot-toast'; // For toast notifications

const NotificationBell = () => {
    const [newNotifications, setNewNotifications] = useState(0);
    const POLLING_INTERVAL = 5000; // Poll every 5 seconds
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/api/notifications'); // Fetch notifications
                const notifications = response.data.notifications;
                setNewNotifications(notifications.length); // Update count of new notifications

                // Display a toast for each new notification
                notifications.forEach((notification) => {
                    toast.success(notification.message); // Show toast message
                });
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Set the interval for polling
        const interval = setInterval(fetchNotifications, POLLING_INTERVAL);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []); // Run once on component mount

    const handleBellClick = () => {
        setNewNotifications(0); // Reset notification count
        navigate('/orders'); // Redirect to the orders page
    };

    return (
        <button onClick={handleBellClick} className="relative">
            <MdNotifications size={24} className="text-gray-600" />
            {newNotifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                    {newNotifications}
                </span>
            )}
        </button>
    );
};

export default NotificationBell;
