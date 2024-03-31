import { useState, useEffect } from 'react';
import PromotionTable from './PromotionTable';
import { Link } from 'react-router-dom';
import { MdDownload } from 'react-icons/md';
import SideBar from '../../components/SideBar';

export default function PromotionManagement() {
  const [reportGenerated, setReportGenerated] = useState(false);
  const [promotionsCount, setPromotionsCount] = useState(0);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = () => {
    fetch('http://localhost:3000/api/read')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to fetch promotions:', response.statusText);
        throw new Error('Failed to fetch promotions');
      }})
      .then(data => {
        setPromotionsCount(data.promotion.length);
      })
      .catch(error => {
        console.error('Error fetching promotions:', error);
      });
  };

  const generateReport = () => {
    fetch('http://localhost:3000/api/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to generate report:', response.statusText);
          throw new Error('Failed to generate report');
        }
      })
      .then(data => {
        let csvContent = "Promotion ID,Coupon Code,Coupon Price,Total Amount,Type,Created At,Expired At,Status,Description\n";
        data.promotion.forEach(promo => {
          csvContent += `${promo.promotionID},${promo.couponCode},${promo.couponPrice},${promo.totalAmount},${promo.type},${promo.createdAt},${promo.expiredAt},${promo.status},${promo.description}\n`;
        });
  
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Promotion Management Report.csv';
        document.body.appendChild(a);

        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setReportGenerated(true);
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
              <p className='text-center text-3xl font-bold'>10</p>
            </div>
            <div className='bg-green-100 border-2 border-green-600 font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Active Offers</p>
              <p className='text-center text-3xl font-bold'>10</p>
            </div>
            <div className='bg-red-100 border-2 border-red-600 font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Inactive Offers</p>
              <p className='text-center text-3xl font-bold'>10</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 mr-10 text-sm text-center'>
            <div><Link to="/create-promotion" className='bg-green-600 text-white hover:bg-green-700 font-semibold rounded-lg inline-block w-full p-3'>Create New Promotion</Link></div>
            <div><Link to="/manage-feedback" className='bg-light-blue text-white hover:bg-blue transition-all font-semibold rounded-lg inline-block w-full p-3'>Manage Feedbacks</Link></div>
          </div>
        </div>
        <PromotionTable />
      </div>
    </div>
  )
}
