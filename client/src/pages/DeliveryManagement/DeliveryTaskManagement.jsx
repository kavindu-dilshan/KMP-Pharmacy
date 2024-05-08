import { useState, useEffect } from 'react';
import DeliveryTaskTable from './DeliveryTaskTable';
import { Link } from 'react-router-dom';
import { MdDownload } from 'react-icons/md';
import SideBar from '../../components/SideBar';
import { jsPDF } from "jspdf";
import "jspdf-autotable";


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
    let yPos = 150; // Define yPos here
    let xPos = 500; //Define the xpos
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
        
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "letter"
        });

  
       const taskCount = data.task.length.toString();

  
        const margin = 40;
  
        doc.setLineWidth(1);
        doc.setDrawColor(0, 90, 139);
        doc.line(30, 30, 580, 30); // Top line
        doc.line(30, 100, 580, 100); // second Top line
        doc.line(580, 780, 580, 30); // Right line
        doc.line(30, 680, 580, 680); // Bottom up line
        doc.line(30, 780, 580, 780); // Bottom line
        doc.line(30, 780, 30, 30); //leftlines
  
        // Title
        doc.setFontSize(30);
        doc.text("Delivery Task Report", margin, 80);
        doc.setFontSize(15);
  
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255);
        doc.text(`Total Tasks(${taskCount})`, margin, 130);
        doc.setTextColor(0, 0, 0);

        // Delivery task section as a table
        const tableColumns = ["Order ID", "Delivery Date", "Assigned Driver", "Delivery Status"];
        const tableData = tasks.map(task => [task.orderId, formatDate(task.deliDate), task.assignDriv, task.deliStatus]);
      
        doc.autoTable({
          startY: yPos,
          head: [tableColumns],
          body: tableData,
          theme: "grid",
          margin: { top: 10 },
          styles: { textColor: [0, 0, 0], fontStyle: "bold" , FontSize:"12"},
          columnStyles: {
            0: { fontStyle: "normal" },
            1: { fontStyle: "normal" },
            2: { fontStyle: "normal" },
            3: { fontStyle: "normal" }
          }
        });
  
        // Counts section
        yPos += 450;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255);
        doc.text("Counts", margin, yPos);
        doc.setTextColor(255, 0, 0);
        doc.setFontSize(12);
        yPos += 20;
        doc.text(`- Delivered Orders: ${deliveredTaskCount}`, margin, yPos);
        doc.setTextColor(0, 128, 0);
        yPos += 20;
        doc.text(`- To be delivered: ${notdeliveredTaskCount}`, margin, yPos);
  
        yPos += 90;
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 255);
        doc.text("KMP Pharmacy (PVT) LTD", margin, yPos);
        doc.setTextColor(0);

        yPos += 20;
        doc.setTextColor(100, 150, 255);
        doc.setFontSize(10);
        doc.text(`The live status of the delivery tasks on `, margin, yPos);
        doc.setTextColor(0,255,0);
        doc.setFontSize(13);
        doc.text(` ${formatDate(new Date())}`, 220, yPos+1);
        
        
        var imgData = 'data:image/png;base64,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';

        // Add the image to the PDF
        doc.addImage(imgData, 'JPEG', 430, 708, 110, 40);  //x y w h
        doc.setTextColor(0, 100, 0);
        doc.save('DeliveryTaskReport.pdf');
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
