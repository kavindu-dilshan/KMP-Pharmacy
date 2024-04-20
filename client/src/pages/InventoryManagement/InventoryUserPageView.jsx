import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import MedicineItem from '../../components/MedicineItem';
import {MdCalendarMonth} from 'react-icons/md';

export default function InventoryUserPageView() {
  const [userview, setuserview] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();  
  }, []);
  
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const fetchInventory = await axios.get('http://localhost:3000/api/inventory/read');
      const response = fetchInventory.data;
    
      setuserview(response.inventory);
      console.log(response.inventory);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-paleblue">
      <NavigationBar/>  

      <h1 className=' pt-4 text-center  text-4xl text-blue font-bold'><MdCalendarMonth className=' pt-4'/>View Available Items</h1>

        <div className="p-7 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!loading &&
          userview.map((item) => (
            <MedicineItem key={item._id} item={item} />
          ))
        }

          
        </div>
        <Footer/>
    </div>
  );
}
