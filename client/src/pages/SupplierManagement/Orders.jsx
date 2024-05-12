import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';
import { Link } from 'react-router-dom';
import { MdDownload } from 'react-icons/md';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function Orders() {
    const [searchQuery, setSearchQuery] = useState('');
    const [supplyRequests, setSupplyRequests] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchSupplyRequests();
    }, []);

    const fetchSupplyRequests = async () => {
        try {
            const response = await axios.get('/api/supplyRequest/read');
            setSupplyRequests(response.data.requests);
            setSearchResults(response.data.requests); // Initialize search results
        } catch (error) {
            console.error('Error fetching supply requests:', error);
            toast.error('Failed to fetch supply requests. Please try again.');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredResults = supplyRequests.filter((request) =>
            request.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.supplier.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const handleDeleteConfirmed = async () => {
        if (deleteId) {
            try {
                await axios.delete(`/api/supplyRequest/delete/${deleteId}`);
                // Update state to remove the deleted request
                setSupplyRequests((prevRequests) => prevRequests.filter((request) => request._id !== deleteId));
                setSearchResults((prevResults) => prevResults.filter((result) => result._id !== deleteId));
                setDeleteId(null);
                toast.success('Supply request deleted successfully!');
            } catch (error) {
                console.error('Error deleting supply request:', error);
                toast.error('Failed to delete supply request.');
            }
        }
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteId(id);
    };

    const handleCancelDelete = () => {
        setDeleteId(null);
    };

    const formatDate = (datetimeString) => {
        const date = new Date(datetimeString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };

    // Function to generate the report for the Orders page
const generateReport = () => {
    axios.get('/api/supplyRequest/read') // Update with your actual endpoint
        .then(response => {
            if (response.status === 200) {
                const data = response.data;
                const requests = data.requests; // Ensure the correct property name

                const doc = new jsPDF({
                    orientation: "portrait",
                    unit: "pt",
                    format: "letter",
                });

                // Document Borders
                const margin = 40;
                doc.setLineWidth(1);
                doc.setDrawColor(0, 90, 139);
                doc.line(30, 30, 580, 30); // Top line
                doc.line(580, 780, 580, 30); // Right line
                doc.line(30, 780, 580, 780); // Bottom line
                doc.line(30, 30, 30, 780); // Left line

                // Title and Subheader
                doc.setFontSize(30);
                doc.text("Supply Request Report", margin, 80);

                doc.setFontSize(15);
                doc.setTextColor(0, 0, 255);
                doc.text(`Total Supply Requests: ${requests.length}`, margin, 130);

                // Table Header and Data
                const tableColumns = ["Medicine Name", "Quantity", "Supplier", "Created At"];
                const tableData = requests.map(request => [
                    request.medicineName,
                    request.quantity,
                    request.supplier,
                    formatDate(request.createdAt),
                ]);

                doc.autoTable({
                    head: [tableColumns],
                    body: tableData,
                    startY: 150, // Initial Y-position for the table
                    theme: "grid",
                    styles: { textColor: [0, 0, 0], fontStyle: "normal", fontSize: 12 },
                    columnStyles: {
                        0: { fontStyle: "bold" },
                        1: { fontStyle: "bold" },
                        2: { fontStyle: "bold" },
                        3: { fontStyle: "bold" },
                    },
                });

                
                // Save the PDF
                doc.save('SupplyRequestReport.pdf');
            } else {
                console.error('Unexpected response status:', response.status);
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('Error generating report:', error);
            toast.error('Failed to generate report.');
        });
};
    

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Supply Orders</h1>
<button onClick={generateReport} className="bg-white hover:bg-light-blue hover:text-white text-black border-2 border-light-blue font-semibold transition-all py-2 px-4 rounded-lg inline-flex items-center">
              <MdDownload className='text-2xl mr-2' />
              <span>Download Report</span>
            </button>
                </div>

                <div>
                    <form className='px-10 py-2 pb-7 flex justify-end' onSubmit={handleSearch}>
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder='Search Supply Orders'
                                className='bg-white border-2 border-light-blue rounded-md placeholder-gray focus:outline-none w-56 p-2 pl-10'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className='text-gray absolute top-1/2 transform -translate-y-1/2 left-3' />
                        </div>
                        <button
                            type='submit'
                            className='bg-light-blue border-2 border-light-blue text-white rounded-md w-32 ml-2 hover:bg-blue hover:border-blue transition-all'
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className='px-10'>
                    <table className="w-full border-2 border-blue">
                        <thead>
                            <tr className="bg-blue text-white text-left">
                                <th className="border border-blue px-4 py-2">Medicine Name</th>
                                <th className="border border-blue px-4 py-2">Quantity</th>
                                <th className="border border-blue px-4 py-2">Supplier</th>
                                <th className="border border-blue px-4 py-2">Created At</th>
                                <th className="border border-blue px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((request) => (
                                <tr key={request._id} className="bg-paleblue">
                                    <td className="border-b-2 border-b-blue px-4 py-2">{request.medicineName}</td>
                                    <td className="border-b-2 border-b-blue px-4 py-2">{request.quantity}</td>
                                    <td className="border-b-2 border-b-blue px-4 py-2">{request.supplier}</td>
                                    <td className="border-b-2 border-b-blue px-4 py-2">{request.createdAt}</td>
                                    <td className="border-b-2 border-b-blue px-4 py-2">
                                        <button
                                            onClick={() => handleDeleteConfirmation(request._id)}
                                            className='bg-red-600 text-white hover:bg-red-700 transition-all rounded px-4 py-1 ml-2'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {deleteId && (
                    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-dark-blue bg-opacity-90">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this supply request?</p>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleDeleteConfirmed}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={handleCancelDelete}
                                    className="bg-slate-200 text-slate-900 px-4 py-2 rounded-md hover:bg-slate-300 ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
