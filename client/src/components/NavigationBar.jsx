import { FaChevronDown, FaList, FaSearch } from 'react-icons/fa';
import { LuPhoneCall } from "react-icons/lu";
import { useState } from 'react';
import { useSelector } from 'react-redux';

import mainlogo from '../assets/Main-Logo.svg';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
    //user management
    const { currentUser } = useSelector((state) => state.user);
    //here
    const [isOpen , setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

  return (
    <div>
        <div className='bg-paleblue'>
            <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
                <div className='flex justify-normal'>
                    <img src={mainlogo} alt="logo" className='' />
                    <form  className='flex justify-end text-sm ml-10'>
                        <div className='relative'>
                            <input type='text' placeholder='Search for medication' className='bg-white border-2 border-light-blue rounded-md placeholder-gray focus:outline-none w-56 p-2 pl-10'/>
                            <FaSearch className='text-gray absolute top-1/2 transform -translate-y-1/2 left-3' />
                        </div>
                        <button type='submit' className='bg-light-blue border-2 border-light-blue text-white rounded-md px-10 ml-2 hover:bg-blue hover:border-blue transition-all'>Search</button>
                    </form>
                </div>
                <button onClick={togglePopup} type='submit' class='bg-light-blue border-2 border-light-blue text-white rounded-md p-2 px-5 flex text-sm ml-2 hover:bg-blue hover:border-blue transition-all'>
                    <LuPhoneCall className='mr-2 text-lg' />
                    Talk to pharmacists
                </button>
                {showPopup && (
                        <div className="absolute z-10 mt-2 top-16 right-16 bg-white shadow-lg rounded-md p-2 px-4 text-lg font-semibold transition-all">
                            <p className="text-blue">Phone: 0115656994</p>
                        </div>
                )}
            </div>
        </div>
        <div className='bg-blue'>
            <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
                <div className="relative inline-block text-left text-white">
                    <button onClick={toggleMenu} className='flex place-items-center'>
                        <FaList className="ml-2 text-4xl"/>
                        <p type="button" className=" w-full rounded-md bg-blue font-medium focus:outline-none" id="options-menu">Home</p>
                        <FaChevronDown className="ml-2 text-2xl"/>
                    </button>
                    {isOpen && (
                        <div class="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-blue" role="menu">
                            <div className="" role="none">
                                <Link to='/' className="block px-4 py-2 text-sm hover:bg-dark-blue border-b-2" role="menuitem">Home</Link>
                                <Link to='/upload'  className="block px-4 py-2 text-sm hover:bg-dark-blue border-b-2" role="menuitem">Upload Prescription</Link>
                                <Link to="/feedback" className="block px-4 py-2 text-sm hover:bg-dark-blue border-b-2" role="menuitem">Feedback</Link>
                                <Link to='/promotions'  className="block px-4 py-2 text-sm hover:bg-dark-blue border-b-2" role="menuitem">Promotions</Link>
                                <Link to='/inventory-user'  className="block px-4 py-2 text-sm hover:bg-dark-blue border-b-2" role="menuitem">Drug Catalog</Link>
                                <Link to='/driver-signin'  className="block px-4 py-2 text-sm hover:bg-dark-blue border-b-2" role="menuitem">Driver Login</Link>
                                <Link to='/employee-sign-in'  className="block px-4 py-2 text-sm hover:bg-dark-blue rounded-md" role="menuitem">Admin Login</Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex'>
                    {/* user manager */}
                <Link to={'/profile'}>
                {currentUser ? (
                        <img className='rounded-full h-9 w-9 object-cover' src={currentUser.avatar} alt='profile' />
                    ) : (
                <button type='submit' className='bg-white text-dark-blue rounded-md p-2 px-6 flex text-sm ml-2
                 hover:bg-slate-100 transition-all'>Login</button>)}
                </Link>
                {!currentUser && (
    <Link to={'/sign-up'}>
        <button type='submit' className='bg-green-600 text-white rounded-md p-2 px-6 flex text-sm ml-6 hover:bg-green-700 transition-all'>Register</button>
    </Link>
)}
                </div>
            </div>
        </div>
    </div>
  )
}
