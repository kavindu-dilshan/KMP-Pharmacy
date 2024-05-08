import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';


export default function DeliveryManagement() {
  const [taskCount, setTaskCount] = useState(0);
  const [deliveredTaskCount, setDeliveredTaskCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [availableDriverCount, setAvailableDriverCount] = useState(0);
 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:3000/api/task/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch tasks:', response.statusText);
          throw new Error('Failed to fetch tasks');
        }
      })
      .then(data => {
        const tasks = data.task;
        setTaskCount(tasks.length);
  
        const deliveredTaskCount = tasks.filter(task => task.deliStatus=== 'Delivered');
        setDeliveredTaskCount(deliveredTaskCount.length);
      })
      .catch(error => {
        console.error('Error fetching drivers:', error);
      });
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = () => {
    fetch('http://localhost:3000/api/driver/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch drivers:', response.statusText);
          throw new Error('Failed to fetch drivers');
        }
      })
      .then(data => {
        const drivers = data.driver;
        setDriverCount(drivers.length);
  
        const availableDriverCount = drivers.filter(driver => driver.availabilty === 'Available' && driver.licenseValidity === 'Valid');
        setAvailableDriverCount(availableDriverCount.length);
       
      })
      .catch(error => {
        console.error('Error fetching drivers:', error);
      });
  };

  return (
  <div className='flex'>
      <SideBar />
      <div className='flex-1'>
        <div className='bg-paleblue justify-between flex px-10 py-10'>
          <h1 className='text-4xl font-bold text-blue'>Delivery Management Dashboard</h1>
          <div className='flex gap-2 cursor-pointer'>
            <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/120442263?s=400&u=7520de9a5dfa3a68aa9b35c51ff4a845145e3d6d&v=4" />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between font-bold">
                <h1>Dilmani Kiriella</h1>
              </div>
              <p className='text-xs '>Delivery Manager</p>
            </div>
            </div>
            </div>
            <div className='flex items-center ml-10 justify-between mt-7'>
            <div className='flex gap-4'>
            <div className='bg-lighter-blue border-2 border-light-blue font-medium rounded-2xl w-fit px-10 p-8'>
              <p className='text-center text-lg'>Task Count</p>
              <p className='text-center text-3xl font-bold'>{taskCount}</p>
            </div>
            <div className='bg-orange-200 border-2 border-orange-600 font-medium rounded-2xl w-fit px-10 p-8'>
              <p className='text-center text-lg'>Delivery Tasks Completed</p>
              <p className='text-center text-3xl font-bold'>{deliveredTaskCount}</p>
            </div>
            <div className='bg-green-100 border-2 border-green-600 font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Driver Count</p>
              <p className='text-center text-3xl font-bold'>{driverCount}</p>
            </div>
            <div className='bg-purple-100 border-2 border-purple-600 font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Available Driver Count</p>
              <p className='text-center text-3xl font-bold'>{availableDriverCount}</p>
            </div>
          </div>
    </div>
    <div className='flex-01 flex'>
    

    <div className='w-2xl flex justify-center items-center'>
        <div className="flex flex-col gap-4 ml-10  mt-10 w-80">
            <Link to="/create-task" className="bg-blue text-white px-1 py-3 rounded-lg text-center hover:bg-dark-blue transition-all">
                Create Task
            </Link>
            <Link to="/driver-create" className="bg-blue text-white px-1 py-3 rounded-lg text-center hover:bg-dark-blue transition-all">
                Add Driver
            </Link>
            <Link to="/taskpage" className="bg-blue text-white px-1 py-3 rounded-lg text-center hover:bg-dark-blue transition-all">
                Manage Tasks
            </Link>
            <Link to="/driver-management" className="bg-blue text-white px-1 py-3 rounded-lg text-center hover:bg-dark-blue transition-all">
                Manage Drivers
            </Link>
        </div>
    </div>
    <img src='https://img.graphicsurf.com/2019/12/food-delivery-vector-illustration2.jpg' className='w-1/2' alt="Delivery Image" />
</div>
    </div>
    </div>

  )}