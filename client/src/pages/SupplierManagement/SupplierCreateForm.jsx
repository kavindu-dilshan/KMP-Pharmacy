import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';

export default function SupplierCreateForm() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        supplierID: '',
        firstName: '',
        lastName: '',
        DOB: '',
        email: '',
        contactNo: '',
        NIC: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValue(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 'Active' : 'Inactive') : value
        }));
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addSupplier = await axios.post('http://localhost:3000/api/supplier/create', value);
            const response = addSupplier.data;
            if (response.success) {
                toast.success(response.message, {duration: 4000});
                setTimeout(() => {
                    navigate('/supplier-management');
                });
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
                    <h1 className='text-4xl font-bold text-blue'>Add New Supplier</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/165793855?v=4" alt="tania andrew" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between font-bold">
                                <h1>Shahaam Marzook</h1>
                            </div>
                            <p className='text-xs '>Supplier Manager</p>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Supplier ID</label>
                            <input type="text" placeholder='Enter Supplier ID' id="supplierID" name="supplierID" value={value.supplierID} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Supplier</label>
                            <input type="text" placeholder='Enter Supplier Name' id="firstName" name="firstName" value={value.firstName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Contact Person</label>
                            <input type="text" placeholder='Enter Contact Person Name' id="lastName" name="lastName" value={value.lastName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Contact Number</label>
                            <input type="text" placeholder='Enter Contact Number' id="contactNo" name="contactNo" value={value.contactNo} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Address</label>
                            <textarea type="textarea" placeholder='Enter Address' id="address" name="address" value={value.address} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>

                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                        <label className='font-semibold text-black'>Email</label>
                            <input type="text" placeholder='Enter Email' id="email" name="email" value={value.email} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>


                            <label className='font-semibold text-black'>Date of Birth</label>
                            <input type="date" id="DOB" name="DOB" value={value.DOB} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>
                            
                            <label className='font-semibold text-black'>NIC</label>
                            <input type="text" placeholder='Enter NIC' id="NIC" name="NIC" value={value.NIC} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>

                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
