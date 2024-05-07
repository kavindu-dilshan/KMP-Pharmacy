import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import MedicineItem from '../../components/MedicineItem';
import { MdCalendarMonth } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa'; // Import FaSearch icon

export default function InventoryUserPageView() {
  const [userview, setuserview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false); // State to manage whether to show the "No results" message

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') { // Check if searchQuery is not empty
      const filtered = userview.filter((elem) => {
        const nameMatch = elem.Mname.toLowerCase().includes(searchQuery.toLowerCase());
        const priceMatch = elem.Mprice.toString().includes(searchQuery);
        const supplierMatch = elem.Msupplier.toLowerCase().includes(searchQuery.toLowerCase());
  
        return nameMatch || priceMatch || supplierMatch;
      });

      if (filtered.length === 0) {
        setNoResults(true); // If no results found, set noResults state to true
        console.log(searchQuery)
      } else {
        setNoResults(false); // If results found, set noResults state to false
      }

      setSearchResults(filtered);
    } else {
      setSearchResults(userview); // Show all items if no search query is entered
      setNoResults(false); // Reset noResults state when showing all items
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const fetchInventory = await axios.get('http://localhost:3000/api/inventory/read');
      const response = fetchInventory.data;

      setuserview(response.inventory);
      setSearchResults(response.inventory)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-paleblue">
      <NavigationBar />

      <h1 className='pt-4 text-center text-4xl text-blue font-bold'><MdCalendarMonth className='pt-4'/>View Available Items</h1>
      <div> 
        <form className='px-10 py-2 pb-7 flex justify-end' onSubmit={handleSearch}>
          <div className='relative'>
            <input type='text' placeholder='Search for medications' className=' text-sm bg-white border-2 border-light-blue rounded-md placeholder-gray focus:outline-none w-56 p-2 pl-10' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
            <FaSearch className='text-gray absolute top-1/2 transform -translate-y-1/2 left-3' />
          </div>
          <button type='submit' className='bg-light-blue border-2 border-light-blue text-white rounded-md w-32 ml-2 hover:bg-blue hover:border-blue transition-all'>Search</button>
        </form>
      </div>

      {/* ternary operator */}

      {noResults ? ( // Render the message only when noResults state is true
        <div className="p-7 flex justify-center">
          <p className='text-xl text-center text-red-400 font-bold'>Sorry, we don't have that medicine Item.We're actively working on getting the medicine you need.<br/><p className='text-green-400 uppercase'>Stay tuned for updates!</p></p>
        </div>
      ) : (
        <div className="p-7 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((elem, index) => (
            <MedicineItem key={index} item={elem} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
