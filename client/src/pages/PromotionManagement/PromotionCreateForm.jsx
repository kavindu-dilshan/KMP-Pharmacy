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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValue(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 'Active' : 'Inactive') : value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const checkUniquePromotionID = async (promotionID) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/promotion/check-unique-id`, {
                params: { promotionID }
            });
            return response.data.exists;
        } catch (error) {
            console.error("Error checking promotion ID:", error);
            return false;
        }
    };

    const checkUniqueCouponCode = async (couponCode) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/promotion/check-unique-code`, {
                params: { couponCode }
            });
            return response.data.exists;
        } catch (error) {
            console.error("Error checking coupon code:", error);
            return false;
        }
    };

    const validateInputs = async (values) => {
        const validationErrors = {};

        const promotionIDRegex = /^P\d{3}$/;

        if (!values.promotionID.trim()) {
            validationErrors.promotionID = 'Promotion ID is required';
        } else if (!promotionIDRegex.test(values.promotionID.trim())) {
            validationErrors.promotionID = 'Promotion ID must be in the format "P001"';
        } else {
            const exists = await checkUniquePromotionID(values.promotionID);
            if (exists) {
                validationErrors.promotionID = 'Promotion ID already exists';
            }
        }

        if (!values.couponCode.trim()) {
            validationErrors.couponCode = 'Coupon Code is required';
        } else {
            const exists = await checkUniqueCouponCode(values.couponCode);
            if (exists) {
                validationErrors.couponCode = 'Coupon Code already exists';
            }
        }

        if (!values.couponPrice.trim()) {
            validationErrors.couponPrice = 'Coupon Price is required';
        } else if (parseFloat(values.couponPrice) <= 0) {
            validationErrors.couponPrice = 'Coupon Price must be a positive value';
        }

        if (!values.totalAmount.trim()) {
            validationErrors.totalAmount = 'Total Amount is required';
        } else if (parseFloat(values.totalAmount) <= 0) {
            validationErrors.totalAmount = 'Total Amount must be a positive value';
        }

        if (!values.createdAt.trim()) {
            validationErrors.createdAt = 'Created Date is required';
        }

        if (!values.expiredAt.trim()) {
            validationErrors.expiredAt = 'Expiry Date is required';
        }

        if (new Date(values.expiredAt) <= new Date(values.createdAt)) {
            validationErrors.expiredAt = 'Expiry Date must be after Created Date';
        }

        if (!values.description.trim()) {
            validationErrors.description = 'Description is required';
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = await validateInputs(value);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Object.values(validationErrors).forEach(error => toast.error(error, { duration: 6000, position: 'bottom-right' }));
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/promotion/create', value);
            if (response.data.success) {
                toast.success("Promotion created successfully!", { duration: 4000 });
                setTimeout(() => {
                    navigate('/promotion-management');
                }, 1000);
            } else {
                toast.error("Failed to create promotion.");
            }
        } catch (error) {
            console.error("Error creating promotion:", error);
            toast.error("Error creating promotion. Please try again.");
        }
    };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Add New Coupon</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/125633025?v=4" alt="promotion-manager" />
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
                            {errors.promotionID && <span className="text-red-500 text-sm">{errors.promotionID}</span>}
                            <input type="text" placeholder='Enter promotion ID' id="promotionID" name="promotionID" value={value.promotionID} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.promotionID ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Coupon Code</label>
                            {errors.couponCode && <span className="text-red-500 text-sm">{errors.couponCode}</span>}
                            <input type="text" placeholder='Enter coupon code' id="couponCode" name="couponCode" value={value.couponCode} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.couponCode ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Coupon Price</label>
                            {errors.couponPrice && <span className="text-red-500 text-sm">{errors.couponPrice}</span>}
                            <input type="number" placeholder='Enter coupon price' id="couponPrice" name="couponPrice" value={value.couponPrice} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.couponPrice ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Total Amount</label>
                            {errors.totalAmount && <span className="text-red-500 text-sm">{errors.totalAmount}</span>}
                            <input type="number" placeholder='Enter total amount' id="totalAmount" name="totalAmount" value={value.totalAmount} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.totalAmount ? 'border-red-500' : ''}`} />

                            <label className='font-semibold text-black'>Description</label>
                            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                            <textarea type="textarea" placeholder='Enter description' id="description" name="description" value={value.description} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-40 min-h-40 ${errors.description ? 'border-red-500' : ''}`} />
                            
                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Type</label>
                            <select id="type" name="type" value={value.type} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.type ? 'border-red-500' : ''}`} >
                                <option value="Seasonal">Seasonal</option>
                                <option value="Special">Special</option>
                            </select>

                            <label className='font-semibold text-black'>Created Date</label>
                            {errors.createdAt && <span className="text-red-500 text-sm">{errors.createdAt}</span>}
                            <input type="date" id="createdAt" name="createdAt" value={value.createdAt} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.createdAt ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Expiry Date</label>
                            {errors.expiredAt && <span className="text-red-500 text-sm">{errors.expiredAt}</span>}
                            <input type="date" id="expiredAt" name="expiredAt" value={value.expiredAt} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.expiredAt ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Status</label>
                            <div className='flex gap-6 flex-wrap'>
                                <div className='flex gap-2'>
                                    <input onChange={handleChange} checked={value.status === 'Active'} type="checkbox" name="status" className={`w-5 ${errors.status ? 'border-red-500' : ''}`} />
                                    <span>Active</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input onChange={handleChange} checked={value.status === 'Inactive'} type="checkbox" name="status" className={`w-5 ${errors.status ? 'border-red-500' : ''}`} />
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
