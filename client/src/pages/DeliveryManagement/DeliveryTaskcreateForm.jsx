import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';

export default function DeliveryTaskcreateForm() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        orderId: '',
        cusName: '',
        cusAddress: '',
        deliDate: '',
        assignDriv: '',
        deliStatus: 'Delivered'
    });

    const [errors, setErrors] = useState({});
    const [filteredDrivers, setAvailableDrivers] = useState([]);

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
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

 

    const checkOrderID = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/task/checkorder`, {
                params: { orderId }
            });
            return response.data.exists;
        } catch (error) {
            console.error("Error checking order ID:", error);
            return false;
        }
    };

    const validateInputs = async (values) => {
        const validationErrors = {};

        const orderIDRegex = /^O\d{3}$/;

        if (!values.orderId.trim()) {
            validationErrors.orderId = 'Order ID is required';
        } else if (!orderIDRegex.test(values.orderId.trim())) {
            validationErrors.orderId = 'Order ID must be in the format "O001"';
        } else {
            const exists = await checkOrderID(values.orderId);
            if (exists) {
                validationErrors.orderId = 'Order ID already exists';
            }
        }
        if (!values.cusName.trim()) {
          validationErrors.cusName = 'Customer Name is required';
        }

        if (!values.cusAddress.trim()) {
          validationErrors.cusAddress = 'Customer Address is required';
        }
        if (!values.assignDriv.trim()) {
          validationErrors.assignDriv = 'A Driver should be assigned';
        }

        if (!values.deliDate.trim()) {
            validationErrors.deliDate = 'Delivery Date is required';
        } else {
            const deliveryDate = new Date(values.deliDate);
            const currentDate = new Date();

        if (deliveryDate < currentDate) {
          validationErrors.deliDate = 'Delivery Date must be on or after current date';
      }
  }     

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = await validateInputs(value);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Object.values(validationErrors).forEach(error => toast.error(error, { duration: 6000, position: 'top-right' }));
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/task/create', value);
            if (response.data.success) {
                toast.success("Task created successfully!", { duration: 4000 });
                setTimeout(() => {
                    navigate('/taskpage');
                }, 1000);
            } else {
                toast.error("Failed to create task.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("Error creating task. Please try again.");
        }
    };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Add New Task</h1>
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
                            <input type="text" placeholder='Enter order ID' id="orderId" name="orderId" value={value.orderId} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.orderId ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Customer Name</label>
                            {errors.cusName && <span className="text-red-500 text-sm">{errors.cusName}</span>}
                            <input type="text" placeholder='Enter customer name' id="cusName" name="cusName" value={value.cusName} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.cusName ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Customer Address</label>
                            {errors.cusAddress && <span className="text-red-500 text-sm">{errors.cusAddress}</span>}
                            <input type="textarea" placeholder='Enter customer address' id="cusAddress" name="cusAddress" value={value.cusAddress} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.cusAddress ? 'border-red-500' : ''}`} />
                            
                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>
                            <div className='flex flex-col gap-1 flex-1'>  
                            <label className='font-semibold text-black'>Delivery Date</label>
                            {errors.deliDate && <span className="text-red-500 text-sm">{errors.deliDate}</span>}
                            <input type="date" id="deliDate" name="deliDate" value={value.deliDate} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.deliDate ? 'border-red-500' : ''}`} />
                            
                            <label className='font-semibold text-black'>Driver</label>
                            <select
                            id="assignDriv"
                            name="assignDriv"
                            value={value.assignDriv}
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
                            <select id="deliStatus" name="deliStatus" value={value.deliStatus} onChange={handleChange} className={`border-2 border-gray outline-none rounded-md p-2 mb-4 ${errors.deliStatus? 'border-red-500' : ''}`} >
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