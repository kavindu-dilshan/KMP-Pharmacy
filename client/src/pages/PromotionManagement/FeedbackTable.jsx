import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/feedback/read');
            setFeedbacks(response.data.feedback);
            setSearchResults(response.data.feedback);
        } catch (error) {
            console.error('Error fetching feedbacks:', error.message);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = feedbacks.filter(elem => {
            return elem.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            elem.status.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setSearchResults(filtered);
    };

    const results = searchResults.length > 0 ? searchResults : feedbacks;

    const approve = async (index) => {
        try {
            const updatedFeedbacks = [...results];
            updatedFeedbacks[index].status = 'Approved';
            await axios.put(`http://localhost:3000/api/feedback/update/${updatedFeedbacks[index]._id}`, { status: 'Approved' });
            setSearchResults(updatedFeedbacks);
            toast.success('Feedback approved successfully!');
        } catch (error) {
            console.error('Error approving feedback:', error.message);
        }
    };

    const reject = async (index) => {
        try {
            const updatedFeedbacks = [...results];
            updatedFeedbacks[index].status = 'Rejected';
            await axios.put(`http://localhost:3000/api/feedback/update/${updatedFeedbacks[index]._id}`, { status: 'Rejected' });
            setSearchResults(updatedFeedbacks);
            toast.success('Feedback rejected successfully!');
        } catch (error) {
            console.error('Error rejecting feedback:', error.message);
            toast.error('Failed to reject feedback.');
        }
    };

    return (
        <div className='mt-5'>
            <form className='px-10 py-2 pb-7 flex justify-end' onSubmit={handleSearch}>
                <div className='relative'>
                    <input type='text' placeholder='Search Feedback' 
                    className='bg-white border-2 border-light-blue rounded-md placeholder-gray focus:outline-none w-56 p-2 pl-10' 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    value={searchQuery}/>
                    <FaSearch className='text-gray absolute top-1/2 transform -translate-y-1/2 left-3' />
                </div>
                <button type='submit' className='bg-light-blue border-2 border-light-blue text-white rounded-md w-32 ml-2 hover:bg-blue hover:border-blue transition-all'>Search</button>
            </form>

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
                    {results.map((elem, index) => (
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
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedbackManagement;
