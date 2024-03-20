import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function PromotionUpdateForm() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [promotionData, setPromotionData] = useState({
        promotionID: '',
        couponCode: '',
        couponPrice: '',
        totalAmount: '',
        type: '',
        createdAt: '',
        expiredAt: '',
        status: '',
        description: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/get/${id}`)
        .then(result => {
            const promotion = result.data.promotion;

            promotion.createdAt = promotion.createdAt.split('T')[0];
            promotion.expiredAt = promotion.expiredAt.split('T')[0];
            setPromotionData(promotion);

            console.log(promotion);
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromotionData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStatusChange = (e) => {
        const { id } = e.target;
        const newStatus = id === 'Active' ? 'Active' : 'Inactive';
        setPromotionData(prevState => ({
            ...prevState,
            status: newStatus
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/api/update/${id}`, promotionData)
        .then(response => {
            toast.success('Promotion updated successfully!');
            navigate('/promotions')
        })
        .catch(error => {
            toast.error('Promotion update failed!');
            console.error('Error updating promotion:', error);
        });
    };

    return (
        <div>
            <div>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Update Coupon</h1>
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
            </div>
            <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                <div className='flex flex-col gap-1 flex-1'>
                    <label className='font-semibold text-black'>Promotion ID</label>
                    <input type="text" placeholder='Enter promotion ID' id="promotionID" name="promotionID" value={promotionData.promotionID} onChange={handleChange} className='border-2 border-gray bg-slate-200 outline-none rounded-md p-2 mb-4' readOnly/>

                    <label className='font-semibold text-black'>Coupon Code</label>
                    <input type="text" placeholder='Enter coupon code' id="couponCode" name="couponCode" value={promotionData.couponCode} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                    <label className='font-semibold text-black'>Coupon Price</label>
                    <input type="text" placeholder='Enter coupon price' id="couponPrice" name="couponPrice" value={promotionData.couponPrice} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                    <label className='font-semibold text-black'>Total Amount</label>
                    <input type="text" placeholder='Enter total amount' id="totalAmount" name="totalAmount" value={promotionData.totalAmount} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                    <label className='font-semibold text-black'>Description</label>
                    <textarea type="textarea" placeholder='Enter description' id="description" name="description" value={promotionData.description} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-40 min-h-40' />

                    <input type="submit" value="Update" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                    <label className='font-semibold text-black'>Type</label>
                    <select id="type" name="type" value={promotionData.type} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' >
                        <option value="Seasonal">Seasonal</option>
                        <option value="Special">Special</option>
                    </select>

                    <label className='font-semibold text-black'>Created Date</label>
                    <input type="date" id="createdAt" name="createdAt" value={promotionData.createdAt} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                    <label className='font-semibold text-black'>Expiry Date</label>
                    <input type="date" id="expiredAt" name="expiredAt" value={promotionData.expiredAt} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />
                    
                    <label className='font-semibold text-black'>Status</label>
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" name="status" id="Active" checked={promotionData.status === 'Active'} onChange={handleStatusChange} className='w-5'/>
                            <span>Active</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" name="status" id="Inactive" checked={promotionData.status === 'Inactive'} onChange={handleStatusChange} className='w-5'/>
                            <span>Inactive</span>
                        </div>
                    </div>  
                </div>
            </form>
        </div>
        </div>
    );
}
