import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';

export default function DriverSignIn() {
   
    const [formData, setFormData] = useState({
        driverId: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/driver/signin', formData);
            console.log(response.data);
            setError('');
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Failed to sign in. Please check your credentials and try again.');
            
        }
    };

  return (
    <div className='bg-paleblue min-h-screen'>
      <NavigationBar />
               <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>Driver Sign In</h1>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            
            <input type='text' placeholder='Driver ID' name='driverId' value={formData.driverId} onChange={handleChange} className='border p-3 rounded-lg'/>
            <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} className='border p-3 rounded-lg'/>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <button className='bg-blue text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign In</button>
    </form>
</div>    
</div>
<Footer />
</div>


  )
}

