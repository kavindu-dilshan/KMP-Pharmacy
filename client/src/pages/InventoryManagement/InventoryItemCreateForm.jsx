import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';

export default function PromotionCreateForm() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        Mname: '',
        Mprice: '',
        Mquantity: '',
        Msupplier: '',
        type: 'Capsule',
        manuAt: '',
        expirAt: '',
        storageCondition: '',
        status: 'Active'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;


        if (name === 'unitPrice' || name === 'quantity') {
            const numericValue = parseFloat(value);      
            if (numericValue < 0 || isNaN(numericValue)) {
                setError('Please enter a valid non-negative value.');
                parsedValue = ''; // Clear the value
            } else {
                setError(''); // Clear any previous error
            }
        } else if (name === 'status') {
            parsedValue = 'Active';
        }

        setValue(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };  
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addInventory = await axios.post('http://localhost:3000/api/inventory/create', value);
            const response = addInventory.data;
            if (response.success) {
                toast.success(response.message, { duration: 2000 });
                setTimeout(() => {
                    navigate('/inventory-management');
                }, 1000);
            }           
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        console.log(value);
    };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Add new Inventory Item</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/127751216?…00&u=f53b685eb62a23a72baeda2f44a671c04b804c86&v=4" alt="triss merigold" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between font-bold">
                                <h1>Kavindu Dasanayaka</h1>
                            </div>
                            <p className='text-xs '>Inventory Manager</p>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Medicine Name</label>
                            <input type="text" placeholder='Enter Medicine Name' id="Mname" name="Mname" value={value.Mname} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Unit Price</label>
                            <input type="Number" placeholder='Enter Unit price' id="Mprice" name="Mprice" value={value.Mprice} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>
                            {error && <span className="text-red-500">{error}</span>}

                            <label className='font-semibold text-black'>Quantity</label>
                            <input type="Number" placeholder='Enter Quantity' id="Mquantity" name="Mquantity" value={value.Mquantity} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>
                            {error && <span className="text-red-500">{error}</span>}

                            <label className='font-semibold text-black'>Supplier</label>
                            <input type="text" placeholder='Enter Supplier name' id="Msupplier" name="Msupplier" value={value.Msupplier} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Store Condition</label>
                            <textarea type="textarea" placeholder='Enter Optimal storage conditions' id="Mdescription" name="storageCondition" value={value.storageCondition} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-20 min-h-10' required/>

                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Type</label>
                            <select id="type" name="type" value={value.type} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required>
                                <option value="Capsule">Capsule</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Liquid">Liquid</option>
                                <option value="Other">Other</option>

                            </select>

                            <label className='font-semibold text-black'>manufactures Date</label>
                            <input type="date" id="manuAt" name="manuAt" value={value.manuAt} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Expiration Date</label>
                            <input type="date" id="expirAt" name="expirAt" value={value.expirAt} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <div className='flex items-center gap-2'>
                                <label className='font-semibold text-black'>Available</label>
                                <input type="checkbox" name="status" id="active" checked={value.status === 'Active'} disabled className='w-5'/>
                            </div>

                            <input 
                                type="submit" 
                                value="Submit" 
                                className='bg-light-blue hover:bg-blue text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
                                style={{
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                    border: 'none'
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
