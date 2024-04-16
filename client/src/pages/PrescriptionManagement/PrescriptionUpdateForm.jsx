import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar';

export default function PrescriptionUpdateForm() {

  const { id } = useParams();
  const navigate = useNavigate();

    const [prescriptionData, setPrescriptionData] = useState({
        PrescriptionID: '',
        firstName: '',
        lastName: '',
        age: '',
        contactNo: '',
        MedicationNames: '',
        units: '',
        notes: ''
    });

    useEffect(() => {
      axios.get(`http://localhost:3000/api/prescription/get/${id}`)
      .then(result => {
          const prescription = result.data.prescription;

          //prescription.createdAt = prescription.createdAt.split('T')[0];
          //prescription.expiredAt = prescription.expiredAt.split('T')[0];
          setPrescriptionData(prescription);

          console.log(prescription);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setPrescriptionData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleStatusChange = (e) => {
      const { id } = e.target;
      const newStatus = id === 'Active' ? 'Active' : 'Inactive';
      setPrescriptionData(prevState => ({
          ...prevState,
          status: newStatus
      }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      axios.put(`http://localhost:3000/api/prescription/update/${id}`, prescriptionData)
      .then(() => {
          toast.success('Prescription updated successfully!');
          setTimeout(() => {
              navigate('/prescription-management');
          });
      })
      .catch(error => {
          toast.error('Prescription update failed!');
          console.error('Error updating prescription:', error);
      });
  };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Update Prescription Form</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/130960790?s=96&v=4" alt="tania andrew" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between font-bold">
                                <h1>Mohamed Shahmi</h1>
                            </div>
                            <p className='text-xs '>Prescription Manager</p>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Prescription ID</label>
                            <input type="text" placeholder='Enter Prescription ID' id="PrescriptionID" name="PrescriptionID" value={prescriptionData.PrescriptionID} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' readOnly/>

                            <label className='font-semibold text-black'>First Name</label>
                            <input type="text" placeholder='Enter First Name' id="firstName" name="firstName" value={prescriptionData.firstName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                            <label className='font-semibold text-black'>Last Name</label>
                            <input type="text" placeholder='Enter Last Name' id="lastName" name="lastName" value={prescriptionData.lastName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                            <label className='font-semibold text-black'>Age</label>
                            <input type="text" placeholder='Enter Age' id="age" name="age" value={prescriptionData.age} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' />

                            <label className='font-semibold text-black'>Contact Number</label>
                            <input type="text" placeholder='Enter Contact Number' id="contactNo" name="contactNo" value={prescriptionData.contactNo} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />

                            
                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                        <label className='font-semibold text-black'>Medication Name</label>
                            <input type="text" placeholder='Enter Medication Name' id="medicationName" name="medicationName" value={prescriptionData.MedicationNames} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' />


                            <label className='font-semibold text-black'>Unites</label>
                            <input type="text" placeholder='Enter unites' id="unites" name="unites" value={prescriptionData.units} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' />
                            
                            <label className='font-semibold text-black'>Notes</label>
                            <textarea type="textarea" placeholder='Enter notes' id="notes" name="notes" value={prescriptionData.notes} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' />

                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
