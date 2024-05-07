import React from 'react'
import UserTable from './Usertable';
import SideBar from '../../components/SideBar';
import { MdDownload } from 'react-icons/md';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useState, useEffect } from 'react';

export default function UserManagement() {

  //------------------------------------

  const [userCount, setUserCount] = useState(0);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = () => {
      fetch('http://localhost:3000/api/user/read')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Failed to fetch users:', response.statusText);
            throw new Error('Failed to fetch users');
          }
        })
        .then(data => {
          const users = data.user;
          setUserCount(users.length);
    
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    };

   //------------------------------------ 
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

            const userCount = Users.length;

            doc.setTextColor(0, 0, 255); 
            const text = 'KMP Pharmacy User Management Report';
            // Calculate the width of the text
            const textWidth = doc.getTextDimensions(text).w;
            // Calculate the x-position to center the text horizontally
            const xPosition = (doc.internal.pageSize.getWidth() - textWidth) / 2;
            // Draw the text at the calculated position
            doc.text(text, xPosition, 15);
            // Reset text color to black (default)
            doc.setTextColor(0);

            doc.setTextColor(255, 0, 0);
            doc.text(`Total Registered Users: ${userCount}`, 15, 25);
            doc.setTextColor(0);
    
            const tableHeader = [['User Name', 'Email', 'Phone Number', 'Address']];
    
            const tableData = Users.map(user => [
              user.username,
              user.email,
              user.phonenumber,
              user.address,
              
            ]);
    
            doc.autoTable({
              startY: 35,
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
        <div className='px-10 text-2xl font-semibold pt-5'>
          <span className=''>Registered user Count({userCount})</span>
        </div>
        <div className='flex items-center ml-10 justify-between mt-7'>
          <div className='flex gap-4'>
            <div className='bg-lighter-blue border-2 border-light-blue font-medium rounded-2xl w-fit px-14 p-8'>
              <p className='text-center text-lg'>Registered user Count</p>
              <p className='text-center text-3xl font-bold'>{userCount}</p>
            </div>
          </div>
        </div>
        <UserTable />
        </div>
    </div>
    
  )
}
