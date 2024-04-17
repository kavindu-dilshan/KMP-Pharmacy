import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar';

export default function SupplierUpdateForm() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [supplierData, setSupplierData] = useState({
      supplierID: '',
      firstName: '',
      lastName: '',
      contactNo: '',
      address: '',
      email: '',
      DOB: '',
      NIC: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/supplier/get/${id}`)
        .then(result => {
            const supplier = result.data.supplier;

            //supplier.createdAt = supplier.createdAt.split('T')[0];
            //supplier.expiredAt = supplier.expiredAt.split('T')[0];
            setSupplierData(supplier);

            console.log(supplier);
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplierData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStatusChange = (e) => {
        const { id } = e.target;
        const newStatus = id === 'Active' ? 'Active' : 'Inactive';
        setSupplierData(prevState => ({
            ...prevState,
            status: newStatus
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/api/supplier/update/${id}`, supplierData)
        .then(() => {
            toast.success('Supplier updated successfully!');
            setTimeout(() => {
                navigate('/supplier-management');
            });
        })
        .catch(error => {
            toast.error('Supplier update failed!');
            console.error('Error updating supplier:', error);
        });
    };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className=''>
                    <div className='bg-paleblue justify-between flex px-10 py-8'>
                        <h1 className='text-4xl font-bold text-blue'>Update Supplier</h1>
                        <div className='flex gap-2'>
                            <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/165793855?v=4" alt="profile" />
                            <div className="flex w-full flex-col gap-0.5">
                                <div className="flex items-center justify-between font-bold">
                                    <h1>Shahaam Marzook</h1>
                                </div>
                                <p className='text-xs '>Supplier Manager</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                    <div className='flex flex-col gap-1 flex-1'>
                        <label className='font-semibold text-black'>Supplier ID</label>
                        <input type="text" placeholder='Enter supplier ID' id="supplierID" name="supplierID" value={supplierData.supplierID} onChange={handleChange} className='border-2 border-gray bg-slate-200 outline-none rounded-md p-2 mb-4' readOnly/>

                        <label className='font-semibold text-black'>Supplier</label>
                        <input type="text" placeholder='Enter Supplier name' id="firstName" name="firstName" value={supplierData.firstName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                        <label className='font-semibold text-black'>Contact Person Name</label>
                        <input type="text" placeholder='Enter contact person Name' id="lastName" name="lastName" value={supplierData.lastName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                        <label className='font-semibold text-black'>Contact Number</label>
                        <input type="text" placeholder='Enter Contact Number' id="contactNo" name="contactNo" value={supplierData.contactNo} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                        <label className='font-semibold text-black'>Address</label>
                        <textarea type="textarea" placeholder='Enter Address' id="address" name="address" value={supplierData.address} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-40 min-h-40' />

                        <input type="submit" value="Update" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>                    
                    </div>

                    <div className='flex flex-col gap-1 flex-1'>
                        <label className='font-semibold text-black'>Email</label>
                        <input type="text" placeholder='Enter Email' id="email" name="email" value={supplierData.email} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 '/>


                        <label className='font-semibold text-black'>Date of Birth</label>
                        <input type="date" id="DOB" name="DOB" value={supplierData.DOB} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4'/>
                            
                        <label className='font-semibold text-black'>NIC</label>
                        <input type="text" placeholder='Enter NIC' id="NIC" name="NIC" value={supplierData.NIC} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 '/>
                        
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}
