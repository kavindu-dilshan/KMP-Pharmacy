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
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValue(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 'Active' : 'Inactive') : value
        }));
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs(value);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
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

    const validateInputs = (inputValues) => {
        let errors = {};
        if (!inputValues.supplierID.trim()) {
            errors.supplierID = 'Supplier ID is required';
        }
        if (!inputValues.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!inputValues.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!inputValues.DOB) {
            errors.DOB = 'Date of birth is required';
        }
        if (!inputValues.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(inputValues.email)) {
            errors.email = 'Invalid email format';
        }
        if (!inputValues.contactNo.trim()) {
            errors.contactNo = 'Contact number is required';
        }
        if (!inputValues.NIC.trim()) {
            errors.NIC = 'NIC is required';
        }
        if (!inputValues.address.trim()) {
            errors.address = 'Address is required';
        }
        return errors;
    };

    const isValidEmail = (email) => {
        // Basic email validation regex
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
                            <input type="text" placeholder='Enter Supplier ID' id="supplierID" name="supplierID" value={value.supplierID} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.supplierID && 'border-red'}`} required/>
                            {errors.supplierID && <span className="text-red text-xs">{errors.supplierID}</span>}
                            
                            <label className='font-semibold text-black'>Supplier</label>
                            <input type="text" placeholder='Enter Supplier Name' id="firstName" name="firstName" value={value.firstName} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.firstName && 'border-red'}`} required/>
                            {errors.firstName && <span className="text-red text-xs">{errors.firstName}</span>}
                            
                            <label className='font-semibold text-black'>Contact Person</label>
                            <input type="text" placeholder='Enter Contact Person Name' id="lastName" name="lastName" value={value.lastName} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.lastName && 'border-red'}`} required/>
                            {errors.lastName && <span className="text-red text-xs">{errors.lastName}</span>}
                            
                            <label className='font-semibold text-black'>Contact Number</label>
                            <input type="text" placeholder='Enter Contact Number' id="contactNo" name="contactNo" value={value.contactNo} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.contactNo && 'border-red'}`} required/>
                            {errors.contactNo && <span className="text-red text-xs">{errors.contactNo}</span>}
                            
                            <label className='font-semibold text-black'>Address</label>
                            <textarea type="textarea" placeholder='Enter Address' id="address" name="address" value={value.address} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.address && 'border-red'}`} required/>
                            {errors.address && <span className="text-red text-xs">{errors.address}</span>}
                            
                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Email</label>
                            <input type="text" placeholder='Enter Email' id="email" name="email" value={value.email} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.email && 'border-red'}`} required/>
                            {errors.email && <span className="text-red text-xs">{errors.email}</span>}
                            
                            <label className='font-semibold text-black'>Date of Birth</label>
                            <input type="date" id="DOB" name="DOB" value={value.DOB} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.DOB && 'border-red'}`} required/>
                            {errors.DOB && <span className="text-red text-xs">{errors.DOB}</span>}
                            
                            <label className='font-semibold text-black'>NIC</label>
                            <input type="text" placeholder='Enter NIC' id="NIC" name="NIC" value={value.NIC} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.NIC && 'border-red'}`} required/>
                            {errors.NIC && <span className="text-red text-xs">{errors.NIC}</span>}
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
