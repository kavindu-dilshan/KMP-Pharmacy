import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar';

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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/api/promotion/get/${id}`)
            .then(result => {
                const promotion = result.data.promotion;
                promotion.createdAt = promotion.createdAt.split('T')[0];
                promotion.expiredAt = promotion.expiredAt.split('T')[0];
                setPromotionData(promotion);
            })
            .catch(err => console.error(err));
    }, [id]);

    const validateInputs = () => {
        const validationErrors = {};

        if (!promotionData.couponPrice.trim()) {
            validationErrors.couponPrice = 'Coupon Price is required';
        } else if (parseFloat(promotionData.couponPrice) <= 0) {
            validationErrors.couponPrice = 'Coupon Price must be a positive value';
        }

        if (!promotionData.totalAmount.trim()) {
            validationErrors.totalAmount = 'Total Amount is required';
        } else if (parseFloat(promotionData.totalAmount) <= 0) {
            validationErrors.totalAmount = 'Total Amount must be a positive value';
        }

        if (!promotionData.createdAt.trim()) {
            validationErrors.createdAt = 'Created Date is required';
        }

        if (!promotionData.expiredAt.trim()) {
            validationErrors.expiredAt = 'Expiry Date is required';
        } else if (new Date(promotionData.expiredAt) <= new Date(promotionData.createdAt)) {
            validationErrors.expiredAt = 'Expiry Date must be after Created Date';
        }

        if (!promotionData.description.trim()) {
            validationErrors.description = 'Description is required';
        }

        return validationErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromotionData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.id === 'Active' ? 'Active' : 'Inactive';
        setPromotionData(prevState => ({
            ...prevState,
            status: newStatus
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Object.values(validationErrors).forEach(error => toast.error(error, { duration: 6000, position: 'bottom-right'}));
            return;
        }

        try {
            await axios.put(`http://localhost:3000/api/promotion/update/${id}`, promotionData);
            toast.success('Promotion updated successfully!');
            setTimeout(() => {
                navigate('/promotion-management');
            }, 1000);
        } catch (error) {
            toast.error('Promotion update failed!');
            console.error('Error updating promotion:', error);
        }
    };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Update Coupon</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/125633025?v=4" alt="promotion-manager" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between font-bold">
                                <h1>Kavindu Dilshan</h1>
                            </div>
                            <p className='text-xs'>Promotion Manager</p>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Promotion ID</label>
                            <input type="text" id="promotionID" name="promotionID" value={promotionData.promotionID} onChange={handleChange} className='border-2 border-gray bg-slate-200 outline-none rounded-md p-2 mb-4' readOnly/>

                            <label className='font-semibold text-black'>Coupon Code</label>
                            <input type="text" id="couponCode" name="couponCode" value={promotionData.couponCode} onChange={handleChange} className='border-2 border-gray bg-slate-200 outline-none rounded-md p-2 mb-4' readOnly/>

                            <label className='font-semibold text-black'>Coupon Price</label>
                            {errors.couponPrice && <span className="text-red-500 text-sm">{errors.couponPrice}</span>}
                            <input type="number" id="couponPrice" name="couponPrice" value={promotionData.couponPrice} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.couponPrice ? 'border-red-500' : ''}`} />

                            <label className='font-semibold text-black'>Total Amount</label>
                            {errors.totalAmount && <span className="text-red-500 text-sm">{errors.totalAmount}</span>}
                            <input type="number" id="totalAmount" name="totalAmount" value={promotionData.totalAmount} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.totalAmount ? 'border-red-500' : ''}`} />

                            <label className='font-semibold text-black'>Description</label>
                            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                            <textarea id="description" name="description" value={promotionData.description} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-40 min-h-40 ${errors.description ? 'border-red-500' : ''}`} />

                            <input type="submit" value="Update" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Type</label>
                            <select id="type" name="type" value={promotionData.type} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.type ? 'border-red-500' : ''}`} >
                                <option value="Seasonal">Seasonal</option>
                                <option value="Special">Special</option>
                            </select>

                            <label className='font-semibold text-black'>Created Date</label>
                            {errors.createdAt && <span className="text-red-500 text-sm">{errors.createdAt}</span>}
                            <input type="date" id="createdAt" name="createdAt" value={promotionData.createdAt} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.createdAt ? 'border-red-500' : ''}`} />

                            <label className='font-semibold text-black'>Expiry Date</label>
                            {errors.expiredAt && <span className="text-red-500 text-sm">{errors.expiredAt}</span>}
                            <input type="date" id="expiredAt" name="expiredAt" value={promotionData.expiredAt} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.expiredAt ? 'border-red-500' : ''}`} />
                        
                            <label className='font-semibold text-black'>Status</label>
                            <div className='flex gap-6 flex-wrap'>
                                <div className='flex gap-2'>
                                    <input type="checkbox" name="status" id="Active" checked={promotionData.status === 'Active'} onChange={handleStatusChange} className='w-5' />
                                    <span>Active</span>
                                </div>
                                <div class='flex gap-2'>
                                    <input type="checkbox" name="status" id="Inactive" checked={promotionData.status === 'Inactive'} onChange={handleStatusChange} className='w-5' />
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
