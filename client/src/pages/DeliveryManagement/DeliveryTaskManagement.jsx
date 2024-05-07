import { useState, useEffect } from 'react';
import DeliveryTaskTable from './DeliveryTaskTable';
import { Link } from 'react-router-dom';
import { MdDownload } from 'react-icons/md';
import SideBar from '../../components/SideBar';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import toast from 'react-hot-toast';

export default function DeliveryTaskManagement() {
  const [taskCount, setTaskCount] = useState(0);
  const [deliveredTaskCount, setDeliveredTaskCount] = useState(0);
  const [notdeliveredTaskCount, setnotDeliveredTaskCount]= useState(0);

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
        const notdeliveredTaskCount = tasks.filter(task => task.deliStatus === 'Order Confirmed'|| task.deliStatus === 'On the way');
  
        setDeliveredTaskCount(deliveredTaskCount.length);
        setnotDeliveredTaskCount(notdeliveredTaskCount.length);
      })
      .catch(error => {
        console.error('Error fetching drivers:', error);
      });
  };

    const formatDate = (datetimeString) => {
        const date = new Date(datetimeString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };
  const generateReport = () => {
    fetch('http://localhost:3000/api/task/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to generate report:', response.statusText);
          throw new Error('Failed to generate report');
        }
      })
      .then(data => {
        const tasks = data.task;

        if (tasks.length === 0) {
          toast.error('No records to generate report');
          return;
        }
        const doc = new jsPDF();

        const tableHeader = [['Order ID', 'Customer Name', 'Customer Address', 'Delivery Date', 'Assigned Driver', 'Delivery Status']];

        const tableData = tasks.map(task => [
            task.orderId,
            task.cusName,
            task.cusAddress,
            formatDate(task.deliDate),
            task.assignDriv,
            task.deliStatus
        
        ]);

        doc.autoTable({
          head: tableHeader,
          body: tableData,
        });

        doc.save('Delivery Task Management Report.pdf');
      })
      .catch(error => {
        console.error('Error generating report:', error);
      });
  };
  

  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-1'>
        <div className='bg-paleblue justify-between flex px-10 py-10'>
          <h1 className='text-4xl font-bold text-blue'>Task Management Dashboard</h1>
          <div className='flex gap-6'>
            <button onClick={generateReport} className="bg-white hover:bg-light-blue hover:text-white text-black border-2 border-light-blue font-semibold transition-all py-2 px-4 rounded-lg inline-flex items-center">
              <MdDownload className='text-2xl mr-2' />
              <span>Download Report</span>
            </button>
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
        </div>
        <div className='px-10 text-2xl font-semibold pt-5'>
          <span className=''>Task Count({taskCount})</span>
        </div>
        <div className='flex items-center ml-10 justify-between mt-7'>
          <div className='flex gap-4'>
            <div className='bg-lighter-blue border-2 border-light-blue font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Task Count</p>
              <p className='text-center text-3xl font-bold'>{taskCount}</p>
            </div>
            <div className='bg-green-100 border-2 border-green-600 font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Delivered orders</p>
              <p className='text-center text-3xl font-bold'>{deliveredTaskCount}</p>
            </div>
            <div className='bg-red-100 border-2 border-red-600 font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>To be delivered</p>
              <p className='text-center text-3xl font-bold'>{notdeliveredTaskCount}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 mr-10 text-sm text-center'>
            <div><Link to="/create-task" className='bg-green-600 text-white hover:bg-green-700 font-semibold rounded-lg inline-block w-full p-3'>Add New Task</Link></div>
            
          </div>
        </div>
        <DeliveryTaskTable />
      </div>
    </div>
  )
}
