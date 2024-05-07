
import {React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function PrescriptionCreateForm() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        prescriptionID: '',
        firstname: '',
        lastname: '',
        age: '',
        contactNo: '',
        MedicationNames: '',
        units: '',
        notes: ''
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
        const addPrescription = await axios.post('http://localhost:3000/api/prescription/create', value);
        const response = addPrescription.data;
        if (response.success) {
            console.log(response.message);
            toast.success(response.message, { duration: 4000 });

            setTimeout(() => {
                navigate('/payment'); //payment page needed here  for customer to proceed with payment
            });
        }
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    console.log(value);
};


    return (
        <div className='flex justify-center'>
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Prescription Form</h1>
                
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Prescription ID</label>
                            <input type="text" placeholder='Enter Prescription ID' id="PrescriptionID" name="PrescriptionID" value={value.PrescriptionID} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>First Name</label>
                            <input type="text" placeholder='Enter First Name' id="firstName" name="firstName" value={value.firstName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Last Name</label>
                            <input type="text" placeholder='Enter Last Name' id="lastName" name="lastName" value={value.lastName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Age</label>
                            <input type="text" placeholder='Enter Age' id="age" name="age" value={value.age} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>

                            <label className='font-semibold text-black'>Contact Number</label>
                            <input type="text" placeholder='Enter Contact Number' id="contactNo" name="contactNo" value={value.contactNo} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            
                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                        <label className='font-semibold text-black'>Medication Name</label>
                            <textarea type="textarea" placeholder='Enter Medication Name' id="MedicationNames" name="MedicationNames" value={value.MedicationNames} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>


                            <label className='font-semibold text-black'>Units</label>
                            <input type="text" placeholder='Enter units' id="units" name="units" value={value.units} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>
                            
                            <label className='font-semibold text-black'>Notes</label>
                            <textarea type="textarea" placeholder='Enter notes' id="notes" name="notes" value={value.notes} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 '/>

                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
