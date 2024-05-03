import { useState, useEffect } from 'react';
import PromotionTable from './PromotionTable';
import { Link } from 'react-router-dom';
import { MdDownload } from 'react-icons/md';
import SideBar from '../../components/SideBar';
import { jsPDF } from "jspdf";
import "jspdf-autotable";


export default function PromotionManagement() {
  const [promotionsCount, setPromotionsCount] = useState(0);
  const [activePromotionsCount, setActivePromotionsCount] = useState(0);
  const [inactivePromotionsCount, setInactivePromotionsCount] = useState(0);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = () => {
    fetch('http://localhost:3000/api/promotion/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch promotions:', response.statusText);
          throw new Error('Failed to fetch promotions');
        }
      })
      .then(data => {
        const promotions = data.promotion;
        setPromotionsCount(promotions.length);
  
        const activePromotions = promotions.filter(promotion => promotion.status === 'Active');
        const inactivePromotions = promotions.filter(promotion => promotion.status === 'Inactive');
  
        setActivePromotionsCount(activePromotions.length);
        setInactivePromotionsCount(inactivePromotions.length);
      })
      .catch(error => {
        console.error('Error fetching promotions:', error);
      });
  };

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
};

  const generateReport = () => {
    fetch('http://localhost:3000/api/promotion/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to generate report:', response.statusText);
          throw new Error('Failed to generate report');
        }
      })
      .then(data => {
        const promotions = data.promotion;
        
        const doc = new jsPDF();

        const tableHeader = [['Promotion ID', 'Coupon Code', 'Coupon Price', 'Total Amount', 'Type', 'Created At', 'Expired At', 'Status']];

        const tableData = promotions.map(promotion => [
          promotion.promotionID,
          promotion.couponCode,
          promotion.couponPrice,
          promotion.totalAmount,
          promotion.type,
          formatDate(promotion.createdAt),
          formatDate(promotion.expiredAt),
          promotion.status
        ]);

        doc.autoTable({
          head: tableHeader,
          body: tableData,
        });

        doc.save('Promotion Management Report.pdf');
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
          <h1 className='text-4xl font-bold text-blue'>Promotion Management Dashboard</h1>
          <div className='flex gap-6'>
            <button onClick={generateReport} className="bg-white hover:bg-light-blue hover:text-white text-black border-2 border-light-blue font-semibold transition-all py-2 px-4 rounded-lg inline-flex items-center">
              <MdDownload className='text-2xl mr-2' />
              <span>Download Report</span>
            </button>
            <div className='flex gap-2 cursor-pointer'>
            <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/125633025?v=4" alt="profile" />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between font-bold">
                <h1>Kavindu Dilshan</h1>
              </div>
              <p className='text-xs '>Promotion Manager</p>
            </div>
            </div>
          </div>
        </div>
        <div className='px-10 text-2xl font-semibold pt-5'>
          <span className=''>Promotions({promotionsCount})</span>
        </div>
        <div className='flex items-center ml-10 justify-between mt-7'>
          <div className='flex gap-4'>
            <div className='bg-lighter-blue border-2 border-light-blue font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Total Offers</p>
              <p className='text-center text-3xl font-bold'>{promotionsCount}</p>
            </div>
            <div className='bg-green-100 border-2 border-green-600 font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Active Offers</p>
              <p className='text-center text-3xl font-bold'>{activePromotionsCount}</p>
            </div>
            <div className='bg-red-100 border-2 border-red-600 font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Inactive Offers</p>
              <p className='text-center text-3xl font-bold'>{inactivePromotionsCount}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 mr-10 text-sm text-center'>
            <div><Link to="/create-promotion" className='bg-green-600 text-white hover:bg-green-700 font-semibold rounded-lg inline-block w-full p-3'>Create New Promotion</Link></div>
            <div><Link to="/feedback-management" className='bg-light-blue text-white hover:bg-blue transition-all font-semibold rounded-lg inline-block w-full p-3'>Manage Feedbacks</Link></div>
          </div>
        </div>
        <PromotionTable />
      </div>
    </div>
  )
}
