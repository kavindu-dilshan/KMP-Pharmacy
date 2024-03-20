import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function PromotionTable( props ) {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const fetchPromotion = await axios.get('http://localhost:3000/api/read');
            const response = fetchPromotion.data;
            setData(response);
            setSearchResults(response.promotion || []);
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (datetimeString) => {
        const date = new Date(datetimeString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = data.promotion?.filter(elem => {
            return elem.promotionID.toLowerCase().includes(searchQuery.toLowerCase()) ||
                elem.couponCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                elem.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                elem.status.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setSearchResults(filtered || []);
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteId(id);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/delete/${deleteId}`);
            setData(prevState => ({
                ...prevState,
                promotion: prevState.promotion.filter(promo => promo._id !== deleteId)
            }));
            setDeleteId(null);
            window.location.reload();
            toast.success('Promotion deleted successfully!');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelDelete = () => {
        setDeleteId(null);
    };


  return (
    <div>
        <div>
            <form  className='px-10 py-2 pb-7 flex justify-end' onSubmit={handleSearch}>
                <div className='relative'>
                    <input type='text' placeholder='Search Promotions' className='bg-white border-2 border-light-blue rounded-md placeholder-gray focus:outline-none w-56 p-2 pl-10' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                    <FaSearch className='text-gray absolute top-1/2 transform -translate-y-1/2 left-3' />
                </div>
                <button type='submit' className='bg-light-blue border-2 border-light-blue text-white rounded-md w-32 ml-2 hover:bg-blue hover:border-blue transition-all'>Search</button>
            </form>
        </div>
        <div className='px-10'>
        <table className="w-full border-2 border-blue">
            <thead>
                <tr className="bg-blue text-white text-left">
                    <th className="border border-blue px-4 py-2">Promotion ID</th>
                    <th className="border border-blue px-4 py-2">Coupon Code</th>
                    <th className="border border-blue px-4 py-2">Coupon Price</th>
                    <th className="border border-blue px-4 py-2">Total Amount</th>
                    <th className="border border-blue px-4 py-2">Type</th>
                    <th className="border border-blue px-4 py-2">Created At</th>
                    <th className="border border-blue px-4 py-2">Expired At</th>
                    <th className="border border-blue px-4 py-2">Status</th>
                    <th className="border border-blue px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {searchResults?.map((elem, index) => {
                    return (
                    <tr key={index} className="bg-paleblue">
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.promotionID}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.couponCode}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.couponPrice}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.totalAmount}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.type}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{formatDate(elem.createdAt)}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{formatDate(elem.expiredAt)}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.status}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">
                            <div className='flex text-sm px-full'>
                                <Link to={`/update-promotion/${elem._id}`}><button className='bg-green-600 text-white hover:bg-green-700 transition-all rounded  px-4 py-1'>Update</button></Link>
                                <button onClick={() => handleDeleteConfirmation(elem._id)} className='bg-red-600 text-white hover:bg-red-700 transition-all rounded  px-4 py-1 ml-2'>Delete</button>
                            </div>
                        </td>
                    </tr>
                    )})}
            </tbody>
        </table>
        </div>
        {deleteId && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-dark-blue bg-opacity-90">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this promotion?</p>
                        <div className="flex justify-center">
                            <button onClick={handleDeleteConfirmed} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2">Delete</button>
                            <button onClick={handleCancelDelete} className="bg-slate-200 text-slate-900 px-4 py-2 rounded-md hover:bg-slate-300 ml-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  )
}

export default PromotionTable