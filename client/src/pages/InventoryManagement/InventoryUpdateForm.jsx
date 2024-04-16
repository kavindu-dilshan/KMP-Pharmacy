import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'; // Make sure useParams is imported correctly
import SideBar from '../../components/SideBar';

export default function InventoryUpdateForm() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [inventorydata, setinventorydata] = useState({
        Mname: '',
        Mprice: '',
        Mquantity: '',
        Msupplier: '',
        type: '',
        manuAt: '',
        expirAt: '',
        storageCondition: '',
        status: 'Active'
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/inventory/getsingleitem/${id}`)
        .then(result => {
            const inventory = result.data.inventory;

            inventory.manuAt = inventory.manuAt.split('T')[0];
            inventory.expirAt = inventory.expirAt.split('T')[0];
            setinventorydata(inventory);

            console.log(inventory);
        })
        .catch(err => {
            console.log(err);
        });
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Name:", name);
        console.log("Value:", value);
        setinventorydata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/api/inventory/update/${id}`, inventorydata)
        .then(() => {
            toast.success('Inventory updated successfully!');
            setTimeout(() => {
                navigate('/inventory-management');
            });
        })
        .catch(error => {
            toast.error('Inventory update failed!');
            console.error('Error updating Inventory:', error);
        });
    };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className=''>
                    <div className='bg-paleblue justify-between flex px-10 py-8'>
                        <h1 className='text-4xl font-bold text-blue'>Update Inventory Item</h1>
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
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Medicine Name</label>
                            <input type="text" placeholder='Enter Medicine Name' id="Mname" name="Mname" value={inventorydata.Mname} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Unit Price</label>
                            <input type="Number" placeholder='Enter Unit price' id="Mprice" name="Mprice" value={inventorydata.Mprice} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Quantity</label>
                            <input type="Number" placeholder='Enter Quantity' id="Mquantity" name="Mquantity" value={inventorydata.Mquantity} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Supplier</label>
                            <input type="text" placeholder='Enter Supplier name' id="Msupplier" name="Msupplier" value={inventorydata.Msupplier} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Store Condition</label>
                            <textarea type="textarea" placeholder='Enter Optimal storage conditions' id="Mdescription" name="storageCondition" value={inventorydata.storageCondition} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-20 min-h-10' required/>

                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Type</label>
                            <select id="type" name="type" value={inventorydata.type} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required>
                                <option value="Capsule">Capsule</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Liquid">Liquid</option>
                                <option value="Other">Other</option>

                            </select>

                            <label className='font-semibold text-black'>manufactures Date</label>
                            <input type="date" id="manuAt" name="manuAt" value={inventorydata.manuAt} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Expiration Date</label>
                            <input type="date" id="expirAt" name="expirAt" value={inventorydata.expirAt} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <div className='flex items-center gap-2'>
                                <label className='font-semibold text-black'>Available</label>
                                <input type="checkbox" name="status" id="active" checked={inventorydata.status === 'Active'} disabled className='w-5'/>
                            </div>

                            <input 
                                type="submit" 
                                value=" Update" 
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
