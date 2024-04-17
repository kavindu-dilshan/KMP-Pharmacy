import React, { useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function FeedbackForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '',
    feedback: '',
    status: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRatingClick = (id) => {
    setFormData({ ...formData, rating: id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const submitFeedback = await axios.post('http://localhost:3000/api/feedback/create', formData);
        const response = submitFeedback.data;
        if (response.success) {
            toast.success(response.message, {duration: 4000});
            setTimeout(() => {
                navigate('/feedback');
            });
        }
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    console.log(formData);
};

  return (
    <div className='bg-paleblue'>
      <NavigationBar />
      <div className='max-w-7xl mx-auto p-3 mt-10 flex flex-col items-center'>
        <h1 className='text-center text-4xl text-blue font-bold'>Your Feedback Matters!</h1>
        <p className='text-center max-w-4xl mt-2'>Thank you for choosing KMP Pharmacy. We value your opinion and strive to provide the best possible service to our customers. Please take a moment to share your feedback with us.</p>
      </div>
      <div className='p-10 bg-white mt-5 mb-20 rounded-3xl max-w-5xl border-2 border-light-blue mx-auto'>
        <form className="my-3 mx-14" autoComplete='off' onSubmit={handleSubmit}>
          <div className='flex flex-row gap-4 w-full mb-6'>
            <div className='flex flex-col gap-1 w-full'>
              <label className='font-semibold text-black'>Name<span className="text-red-500">*</span></label>
              <input className='border-2 border-gray outline-none rounded-md p-2' id="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className='flex flex-col gap-1 w-full'>
              <label className='font-semibold text-black'>Email<span className="text-red-500">*</span></label>
              <input className='border-2 border-gray outline-none rounded-md p-2' id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
          <div className='mb-6'>
            <label className='font-semibold text-black'>On a scale of 0 to 10, how likely are you to recommend our service?<span className="text-red-500">*</span></label>
            <div className="flex items-center mt-2" required>
              <button type='button' id='1' className={`mr-3 hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-4 rounded-full ${formData.rating === '1' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('1')}>1</button>
              <button type='button' id='2' className={`mr-3 hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-4 rounded-full ${formData.rating === '2' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('2')}>2</button>
              <button type='button' id='3' className={`mr-3 hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-4 rounded-full ${formData.rating === '3' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('3')}>3</button>
              <button type='button' id='4' className={`mr-3 hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-4 rounded-full ${formData.rating === '4' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('4')}>4</button>
              <button type='button' id='5' className={`mr-3 hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-4 rounded-full ${formData.rating === '5' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('5')}>5</button>
              <button type='button' id='6' className={`mr-3 hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-4 rounded-full ${formData.rating === '6' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('6')}>6</button>
              <button type='button' id='7' className={`mr-3 hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-4 rounded-full ${formData.rating === '7' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('7')}>7</button>
              <button type='button' id='8' className={`mr-3 hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-4 rounded-full ${formData.rating === '8' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('8')}>8</button>
              <button type='button' id='9' className={`mr-3 hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-4 rounded-full ${formData.rating === '9' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('9')}>9</button>
              <button type='button' id='10' className={`hover:bg-light-blue border-2 border-light-blue text-black hover:text-white font-bold py-2 px-3 rounded-full ${formData.rating === '10' ? 'bg-light-blue text-white' : ''}`} onClick={() => handleRatingClick('10')}>10</button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className='font-semibold text-black'>What feature can we add to improve?<span className="text-red-500">*</span></label>
            <textarea className='border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-40 min-h-40' id="feedback" placeholder="We'd love to hear your suggestions" value={formData.feedback} onChange={handleChange} required></textarea>
          </div>
          <div className="flex justify-center">
            <button type="submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 px-10 mt-5 rounded-lg cursor-pointer'>Submit Feedback</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
