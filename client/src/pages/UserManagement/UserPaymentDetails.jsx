import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';

export default function UserPaymentDetails() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        firstName: '',
        lastName: '',
        NIC: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        postalCode: '',
        state: ''
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
            const addPayment = await axios.post('http://localhost:3000/api/payment/create', value);
            const response = addPayment.data;
            if (response.success) {
                toast.success(response.message, {duration: 4000});
                setTimeout(() => {
                    navigate('/');
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
                    <h1 className='text-4xl font-bold text-blue'>Add New Payment</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/165793855?v=4" alt="tania andrew" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between font-bold">
                                <h1>Shahaam Marzook</h1>
                            </div>
                            <p className='text-xs '>Payment Manager</p>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>First Name</label>
                            <input type="text" placeholder='Enter First Name' id="firstName" name="firstName" value={value.firstName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Last Name</label>
                            <input type="text" placeholder='Enter Last Name' id="lastName" name="lastName" value={value.lastName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>ID Number</label>
                            <input type="text" placeholder='Enter ID Number' id="NIC" name="NIC" value={value.NIC} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Contact Number</label>
                            <input type="text" placeholder='Enter Contact Number' id="phoneNumber" name="phoneNumber" value={value.phoneNumber} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Address</label>
                            <textarea type="textarea" placeholder='Enter Address' id="address" name="address" value={value.address} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>

                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>City</label>
                            <input type="text" placeholder='Enter City' id="city" name="city" value={value.city} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>

                            <label className='font-semibold text-black'>postalCode</label>
                            <input type="text" placeholder='Enter Postal Code' id="postalCode" name="postalCode" value={value.postalCode} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>
                           
                            <label className='font-semibold text-black'>State</label>
                            <input type="text" placeholder='Enter State' id="state" name="state" value={value.state} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>

                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
