import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';

export default function SupplyRequestForm() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        medicineName: '',
        quantity: '',
        supplier: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addSupplyRequest = await axios.post(
                "http://localhost:3000/api/supplyRequest/create", 
                value);
            const response = addSupplyRequest.data;
            if (response.success) {
                toast.success(response.message, { duration: 4000 });
                // Clear form fields after successful submission
                setValue({
                    medicineName: '',
                    quantity: '',
                    supplier: '',
                });
                navigate('/inventory-management');
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Create New Supply Request</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/127751216?…00&u=f53b685eb62a23a72baeda2f44a671c04b804c86&v=4" alt="profile" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between font-bold">
                                <h1>Inventory Manager</h1>
                            </div>
                            <p className='text-xs'>Inventory Manager</p>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-black'>Medicine Name</label>
                            <input 
                                type="text" 
                                placeholder='Enter Medicine Name' 
                                id="medicineName" 
                                name="medicineName" 
                                value={value.medicineName} 
                                onChange={handleChange} 
                                className='border-2 border-gray outline-none rounded-md p-2 mb-4' 
                            />

                            <label className='font-semibold text-black'>Quantity</label>
                            <input 
                                type="number" 
                                placeholder='Enter Quantity' 
                                id="quantity" 
                                name="quantity" 
                                value={value.quantity} 
                                onChange={handleChange} 
                                className='border-2 border-gray outline-none rounded-md p-2 mb-4' 
                            />

                            <label className='font-semibold text-black'>Supplier</label>
                            <input 
                                type="text" 
                                placeholder='Enter Supplier Name' 
                                id="supplier" 
                                name="supplier" 
                                value={value.supplier} 
                                onChange={handleChange} 
                                className='border-2 border-gray outline-none rounded-md p-2 mb-4' 
                            />
                        </div>

                        <input 
                            type="submit" 
                            value={loading ? 'Submitting...' : 'Submit'} 
                            className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer' 
                            disabled={loading} 
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
