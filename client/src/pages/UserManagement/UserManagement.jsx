import React from 'react'
import UserTable from './Usertable';
import SideBar from '../../components/SideBar';
import { MdDownload } from 'react-icons/md';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function UserManagement() {
    
    const generateReport = () => {
        fetch('http://localhost:3000/api/user/read')
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('Failed to generate report:', response.statusText);
              throw new Error('Failed to generate report');
            }
          })
          .then(data => {
            const Users = data.user;
    
            const doc = new jsPDF();
    
            const tableHeader = [['User Name', 'Email', 'Phone Number', 'Address']];
    
            const tableData = Users.map(user => [
              user.username,
              user.email,
              user.phonenumber,
              user.address,
              
            ]);
    
            doc.autoTable({
              head: tableHeader,
              body: tableData,
            });
    
            doc.save('User Management Report.pdf');
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
          <h1 className='text-4xl font-bold text-blue'>User Management Dashboard</h1>
          <div className='flex gap-6'>
            <button onClick={generateReport}  className="bg-white hover:bg-light-blue hover:text-white text-black border-2 border-light-blue font-semibold transition-all py-2 px-4 rounded-lg inline-flex items-center">
              <MdDownload className='text-2xl mr-2' />
              <span>Download Report</span>
            </button>
            <div className='flex gap-2 cursor-pointer'>
            <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/165867586?s=400&u=f3960158f67d1f2c9eee4a7bd8313d7b3100ad8e&v=4" alt="profile" />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between font-bold">
                <h1>Nipun Madutha</h1>
              </div>
              <p className='text-xs '>User Manager</p>
            </div>
            </div>
          </div>
        </div>
        <UserTable />
        </div>
       
    </div>
    
  )
}
