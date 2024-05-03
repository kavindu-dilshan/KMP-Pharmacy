import React, { useState, useEffect } from 'react';
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
        address: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isSupplierIDUnique, setIsSupplierIDUnique] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the form value
        setValue((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Reset errors for the changed field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear error for this field
        }));
    };

    const handleSupplierIDBlur = async () => {
        const { supplierID } = value;

        if (!supplierID.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                supplierID: 'Supplier ID is required.',
            }));
            setIsSupplierIDUnique(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/supplier/check/${supplierID}`);
            const isUnique = response.data.unique;

            if (!isUnique) {
                setIsSupplierIDUnique(false);
                toast.error("Supplier ID already exists. Please choose a different one.");
            } else {
                setIsSupplierIDUnique(true);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    supplierID: '',
                }));
            }
        } catch (error) {
            console.error("Error checking supplier ID:", error);
            toast.error("Error checking Supplier ID. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isSupplierIDUnique) {
            toast.error("Supplier ID must be unique. Please choose a different one.");
            return; // Prevent submission if the supplierID isn't unique
        }

        const validationErrors = validateInputs(value);
        if (Object.keys(validationErrors).length > 0) {
            // Display a toast for each error
            Object.values(validationErrors).forEach((error) => {
                toast.error(error);
            });
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/supplier/create', value);
            if (response.data.success) {
                toast.success("Supplier created successfully!", { duration: 4000 });
                setTimeout(() => {
                    navigate('/supplier-management');
                }, 1000);
            } else {
                toast.error("Failed to create supplier. Please try again.");
            }
        } catch (error) {
            console.error("Error creating supplier:", error);
            toast.error("Supplier ID already Exists.");
        }

        setLoading(false);
    };

    const validateInputs = (inputValues) => {
        const validationErrors = {};

        if (!inputValues.supplierID.trim()) {
            validationErrors.supplierID = 'Supplier ID is required';
        }


        if (!inputValues.firstName.trim()) {
            validationErrors.firstName = 'First name is required';
        }

        if (!inputValues.lastName.trim()) {
            validationErrors.lastName = 'Last name is required';
        }

        if (!inputValues.DOB) {
            validationErrors.DOB = 'Date Of Birth is required';
        }

        if (!inputValues.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!isValidEmail(inputValues.email)) {
            validationErrors.email ='Invalid email format';
        }

        // Validate contact number: must be exactly 10 digits, no letters or special characters
        if (!/^\d{10}$/.test(inputValues.contactNo.trim())) {
            validationErrors.contactNo = 'Contact Number must contain exactly 10 digits with no letters or special characters';
        }

        if (!inputValues.NIC.trim()) {
            validationErrors.NIC = 'NIC is required';
        }

        if (!inputValues.address.trim()) {
            validationErrors.address = 'Address is required';
        }

        return validationErrors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
                            <input 
                                type="text" 
                                placeholder='Enter Supplier ID' 
                                id="supplierID" 
                                name="supplierID" 
                                value={value.supplierID} 
                                onChange={handleChange} 
                                className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.supplierID ? 'border-red' : ''}`} 
                                
                            />
                            {errors.supplierID && <span className="text-red text-xs">{errors.supplierID}</span>}

                            <label className='font-semibold text-black'>First Name</label>
                            <input 
                                type="text" 
                                placeholder='Enter First Name' 
                                id="firstName" 
                                name="firstName" 
                                value={value.firstName} 
                                onChange={handleChange} 
                                className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.firstName ? 'border-red' : ''}`} 
                                
                            />
                            {errors.firstName && <span className="text-red text-xs">{errors.firstName}</span>}

                            <label className='font-semibold text-black'>Last Name</label>
                            <input 
                                type="text" 
                                placeholder='Enter Last Name' 
                                id="lastName" 
                                name="lastName" 
                                value={value.lastName} 
                                onChange={handleChange} 
                                className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.lastName ? 'border-red' : ''}`} 
                                
                            />
                            {errors.lastName && <span className="text-red text-xs">{errors.lastName}</span>}

                            <label className='font-semibold text-black'>Contact Number</label>
                            <input 
                                type="text" 
                                placeholder='Enter Contact Number' 
                                id="contactNo" 
                                name="contactNo" 
                                value={value.contactNo} 
                                onChange={handleChange} 
                                className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.contactNo ? 'border-red' : ''}`} 
                                
                            />
                            {errors.contactNo && <span className="text-red text-xs">{errors.contactNo}</span>}

                            <label className='font-semibold text-black'>Address</label>
                            <textarea 
                                type="textarea" 
                                placeholder='Enter Address' 
                                id="address" 
                                name="address" 
                                value={value.address} 
                                onChange={handleChange} 
                                className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.address ? 'border-red' : ''}`} 
                                
                            />
                            {errors.address && <span className="text-red text-xs">{errors.address}</span>}

                            <input 
                                type="submit" 
                                value={loading ? 'Submitting...' : 'Submit'} 
                                className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer' 
                                disabled={loading || !isSupplierIDUnique} // Disable if not unique or loading
                            />
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Email</label>
                            <input 
                                type="text" 
                                placeholder='Enter Email' 
                                id="email" 
                                name="email" 
                                value={value.email} 
                                onChange={handleChange} 
                                className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.email ? 'border-red' : ''}`} 
                                
                            />
                            {errors.email && <span className="text-red text-xs">{errors.email}</span>}

                            <label className='font-semibold text-black'>Date of Birth</label>
                            <input 
                                type="date" 
                                id="DOB" 
                                name="DOB" 
                                value={value.DOB} 
                                onChange={handleChange} 
                                className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.DOB ? 'border-red' : ''}`} 
                                
                            />
                            {errors.DOB && <span className="text-red text-xs">{errors.DOB}</span>}

                            <label className='font-semibold text-black'>NIC</label>
                            <input 
                                type="text" 
                                placeholder='Enter NIC' 
                                id="NIC" 
                                name="NIC" 
                                value={value.NIC} 
                                onChange={handleChange} 
                                className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.NIC ? 'border-red' : ''}`} 
                                
                            />
                            {errors.NIC && <span className="text-red text-xs">{errors.NIC}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
