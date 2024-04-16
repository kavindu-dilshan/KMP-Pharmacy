import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function SupplierTable() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const fetchSupplier = await axios.get('http://localhost:3000/api/supplier/read');
            const response = fetchSupplier.data;
            const updatedSupplier = response.supplier.map(promo => {
                if (new Date(promo.expiredAt) < new Date()) {
                    promo.status = 'Inactive';
                    axios.put(`http://localhost:3000/api/supplier/update/${promo._id}`, { status: 'Inactive' })
                    .then(response => {
                        console.log('Supplier status updated:', response);
                    })
                    .catch(error => {
                        console.error('Error updating Supplier status:', error);
                    });
                }
                return promo;
            });
            setData(response);
            setSearchResults(updatedSupplier);
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
      const filtered = data.supplier?.filter(elem => {
          return elem.supplierID.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.address.toLowerCase().includes(searchQuery.toLowerCase()) ;
      });
      setSearchResults(filtered || []);
  };

    const handleDeleteConfirmation = (id) => {
        setDeleteId(id);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/supplier/delete/${deleteId}`);
            setData(prevState => ({
                ...prevState,
                Supplier: prevState.supplier.filter(promo => promo._id !== deleteId)
            }));
            setDeleteId(null);
            toast.success('Supplier deleted successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
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
                    <input type='text' placeholder='Search Suppliers' className='bg-white border-2 border-light-blue rounded-md placeholder-gray focus:outline-none w-56 p-2 pl-10' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                    <FaSearch className='text-gray absolute top-1/2 transform -translate-y-1/2 left-3' />
                </div>
                <button type='submit' className='bg-light-blue border-2 border-light-blue text-white rounded-md w-32 ml-2 hover:bg-blue hover:border-blue transition-all'>Search</button>
            </form>
        </div>
        <div className='px-10'>
        <table className="w-full border-2 border-blue">
            <thead>
                <tr className="bg-blue text-white text-left">
                    <th className="border border-blue px-4 py-2">Supplier ID</th>
                    <th className="border border-blue px-4 py-2">First Name</th>
                    <th className="border border-blue px-4 py-2">Last Name</th>
                    <th className="border border-blue px-4 py-2">Address</th>
                    <th className="border border-blue px-4 py-2">Contact Number</th>
                    <th className="border border-blue px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {searchResults?.map((elem, index) => {
                    return (
                    <tr key={index} className="bg-paleblue">
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.supplierID}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.firstName}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.lastName}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.address}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.contactNo}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">
                            <div className='flex text-sm px-full'>
                                <Link to={`/update-Supplier/${elem._id}`}><button className='bg-green-600 text-white hover:bg-green-700 transition-all rounded  px-4 py-1'>Update</button></Link>
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
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this Supplier?</p>
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

export default SupplierTable