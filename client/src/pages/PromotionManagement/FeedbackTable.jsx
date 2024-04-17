import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/feedback/read');
            console.log(response.data);
            setFeedbacks(response.data.feedback);
        } catch (error) {
            console.error('Error fetching feedbacks:', error.message);
        }
    };

    const approve = async (index) => {
        try {
            const updatedFeedbacks = [...feedbacks];
            updatedFeedbacks[index].status = 'Approved';
            setFeedbacks(updatedFeedbacks);
            await axios.put(`http://localhost:3000/api/feedback/update/${updatedFeedbacks[index]._id}`, { status: 'Approved' });
            toast.success('Feedback aproved successfully!');
        } catch (error) {
            console.error('Error approving feedback:', error.message);
        }
    };

    const reject = async (index) => {
        try {
            const updatedFeedbacks = [...feedbacks];
            updatedFeedbacks[index].status = 'Rejected';
            setFeedbacks(updatedFeedbacks);
            await axios.delete(`http://localhost:3000/api/feedback/delete/${updatedFeedbacks[index]._id}`, { status: 'Rejected' });
            toast.success('Feedback rejected successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error rejecting feedback:', error.message);
        }
    };

    return (
        <div className='mt-20'>
            <div className='px-10'>
                <table className="w-full border-2 border-blue">
                    <thead>
                        <tr className="bg-blue text-white text-left">
                            <th className="border border-blue px-4 py-2">Name</th>
                            <th className="border border-blue px-4 py-2">Email</th>
                            <th className="border border-blue px-4 py-2">Rating</th>
                            <th className="border border-blue px-4 py-2">Feedback</th>
                            <th className="border border-blue px-4 py-2">Status</th>
                            <th className="border border-blue px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {feedbacks.map((elem, index) => {
                        return (
                            <tr key={index} className="bg-paleblue">
                                <td className="border-b-2 border-b-blue px-4 py-2">{elem.name}</td>
                                <td className="border-b-2 border-b-blue px-4 py-2">{elem.email}</td>
                                <td className="border-b-2 border-b-blue px-4 py-2">{elem.rating}/10</td>
                                <td className="border-b-2 border-b-blue px-4 py-2">{elem.feedback}</td>
                                <td className="border-b-2 border-b-blue px-4 py-2">{elem.status}</td>
                                <td className="border-b-2 border-b-blue px-4 py-2">
                                    <div className='flex text-sm px-full'>
                                        <button onClick={() => approve(index)} className='bg-green-600 text-white hover:bg-green-700 transition-all rounded px-4 py-1 ml-2'>Approve</button>
                                        <button onClick={() => reject(index)} className='bg-red-600 text-white hover:bg-red-700 transition-all rounded px-4 py-1 ml-2'>Reject</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default FeedbackManagement;
