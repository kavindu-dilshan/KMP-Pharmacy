import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar';

export default function DeliveryTaskUpdateForm() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, settaskData] = useState({
        orderId: '',
        cusName: '',
        cusAddress: '',
        deliDate: '',
        assignDriv: '',
        deliStatus: ''
    });

    const [errors, setErrors] = useState({});
    const [filteredDrivers, setAvailableDrivers] = useState([]);

  useEffect(() => {
      axios.get(`http://localhost:3000/api/task/get/${id}`)
          .then(result => {
              const task = result.data.task;
              task.deliDate = task.deliDate.split('T')[0];
              settaskData(task);
          })
          .catch(err => console.error(err));
  }, [id]);   

    
  useEffect(() => {
    const fetchAvailableDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/driver/read');
        console.log(response.data); 
        const filteredDrivers = response.data.driver.filter(driver => driver.availabilty === 'Available' && driver.licenseValidity === 'Valid');
        setAvailableDrivers(filteredDrivers);
      } catch (error) {
        console.error('Error fetching available drivers:', error);
      }
    };

    fetchAvailableDrivers();
  }, []);

  

    const handleChange = (e) => {
        const { name, value} = e.target;
        settaskData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };


    const validateInputs = async (taskData) => {
        const validationErrors = {};
        
        if (!taskData.deliDate.trim()) {
            validationErrors.deliDate = 'Delivery Date is required';
        } else {
            const deliveryDate = new Date(taskData.deliDate);
            const currentDate = new Date();

        if (deliveryDate < currentDate) {
          validationErrors.deliDate = 'Delivery Date must be on or after current date';
      }
  }     
        if (!taskData.cusName.trim()) {
          validationErrors.cusName = 'Customer Name is required';
      }
        if (!taskData.cusAddress.trim()) {
          validationErrors.cusAddress = 'Delivery Address is required';
      }
        if (!taskData.assignDriv.trim()) {
          validationErrors.assignDriv = 'A Driver should be assigned';
      }
       
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = await validateInputs(taskData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Object.values(validationErrors).forEach(error => toast.error(error, { duration: 6000, position: 'top-right' }));
            return;
        }

        try {
          await axios.put(`http://localhost:3000/api/task/update/${id}`, taskData);
          toast.success('Task updated successfully!');
          setTimeout(() => {
              navigate('/taskpage');
          }, 1000);
      } catch (error) {
          toast.error('Task update failed!');
          console.error('Error updating task:', error);
      }
  };
    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Update Task</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/120442263?s=400&u=7520de9a5dfa3a68aa9b35c51ff4a845145e3d6d&v=4" alt="tania andrew" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between font-bold">
                                <h1>Dilmani Kiriella</h1>
                            </div>
                            <p className='text-xs '>Delivery Manager</p>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Order ID</label>
                            {errors.orderId && <span className="text-red-500 text-sm">{errors.orderId}</span>}
                            <input type="text" placeholder='Enter order ID' id="orderId" name="orderId" value={taskData.orderId} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.orderId ? 'border-red-500' : ''}`} readOnly/>
                            
                            <label className='font-semibold text-black'>Customer Name</label>
                            {errors.cusName && <span className="text-red-500 text-sm">{errors.cusName}</span>}
                            <input type="text" placeholder='Enter customer name' id="cusName" name="cusName" value={taskData.cusName} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.cusName ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Customer Address</label>
                            {errors.cusAddress && <span className="text-red-500 text-sm">{errors.cusAddress}</span>}
                            <input type="textarea" placeholder='Enter customer address' id="cusAddress" name="cusAddress" value={taskData.cusAddress} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.cusAddress ? 'border-red-500' : ''}`} />
                            
                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>
                            <div className='flex flex-col gap-1 flex-1'>  
                            <label className='font-semibold text-black'>Delivery Date</label>
                            {errors.deliDate && <span className="text-red-500 text-sm">{errors.deliDate}</span>}
                            <input type="date" id="deliDate" name="deliDate" value={taskData.deliDate} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.deliDate ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Driver</label>
                            <select
                            id="assignDriv"
                            name="assignDriv"
                            value={taskData.assignDriv}
                            onChange={handleChange}
                            className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.assignDriv ? 'border-red-500' : ''}`}
                          >
                            <option value="">Select a driver</option>
                            {Array.isArray(filteredDrivers) && filteredDrivers.map(driver => (
                              <option key={driver.driverId} value={driver.driverId}>{driver.driverName}</option>
                            ))}
                          </select>
                            
                            <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Delivery Status</label>
                            <select id="deliStatus" name="deliStatus" value={taskData.deliStatus} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.deliStatus? 'border-red-500' : ''}`} >
                                <option value="Order Confirmed">Order Confirmed</option>
                                <option value="On the way">On the way</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                           
                        </div>
                        </div>
                        </form>
                  </div>
                
            </div>
        </div>
    );
}