import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';

export default function PromotionCreateForm() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        promotionID: '',
        couponCode: '',
        couponPrice: '',
        totalAmount: '',
        type: 'Seasonal',
        createdAt: '',
        expiredAt: '',
        status: 'Active',
        description: ''
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
            const addPromotion = await axios.post('http://localhost:3000/api/create', value);
            const response = addPromotion.data;
            if (response.success) {
                toast.success(response.message, {duration: 4000});
                setTimeout(() => {
                    navigate('/promotion-management');
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
                    <h1 className='text-4xl font-bold text-blue'>Add New Coupon</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/125633025?v=4" alt="tania andrew" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between font-bold">
                                <h1>Kavindu Dilshan</h1>
                            </div>
                            <p className='text-xs '>Promotion Manager</p>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Promotion ID</label>
                            <input type="text" placeholder='Enter promotion ID' id="promotionID" name="promotionID" value={value.promotionID} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Coupon Code</label>
                            <input type="text" placeholder='Enter coupon code' id="couponCode" name="couponCode" value={value.couponCode} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Coupon Price</label>
                            <input type="number" placeholder='Enter coupon price' id="couponPrice" name="couponPrice" value={value.couponPrice} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Total Amount</label>
                            <input type="number" placeholder='Enter total amount' id="totalAmount" name="totalAmount" value={value.totalAmount} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Description</label>
                            <textarea type="textarea" placeholder='Enter description' id="description" name="description" value={value.description} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-40 min-h-40' required/>

                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Type</label>
                            <select id="type" name="type" value={value.type} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required>
                                <option value="Seasonal">Seasonal</option>
                                <option value="Special">Special</option>
                            </select>

                            <label className='font-semibold text-black'>Created Date</label>
                            <input type="date" id="createdAt" name="createdAt" value={value.createdAt} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Expiry Date</label>
                            <input type="date" id="expiredAt" name="expiredAt" value={value.expiredAt} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>
                            
                            <label className='font-semibold text-black'>Status</label>
                            <div className='flex gap-6 flex-wrap'>
                                <div className='flex gap-2'>
                                    <input onChange={handleChange} checked={value.status === 'Active'} type="checkbox" name="status" id="Active" className='w-5'/>
                                    <span>Active</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input onChange={handleChange} checked={value.status === 'Inactive'} type="checkbox" name="status" id="Inactive" className='w-5'/>
                                    <span>Inactive</span>
                                </div>
                            </div>  
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
