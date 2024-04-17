import React, { useState, useEffect } from 'react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback()
      .then(data => {
        console.log('Fetched feedback:', data);
        if (data && data.success) {
          setFeedback(data.feedback);
        } else {
          console.error('Failed to fetch feedback:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching feedback:', error.message);
      });
  }, []);
  

  const fetchFeedback = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/feedback/read');
      if (!response.ok) {
        throw new Error('Failed to fetch feedback: ' + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching feedback:', error.message);
      throw new Error('Failed to fetch feedback');
    }
  };

  console.log('Feedback state:', feedback);

  const approvedFeedback = feedback.filter(item => item.status === 'Approved');

  return (
    <div className='bg-paleblue'>
      <NavigationBar />
      
      <div className='max-w-7xl mx-auto p-3 mt-10'>
        <h1 className='text-center text-4xl text-blue font-bold'>Feedback from our customers</h1>
        <div><Link to="/feedback-submit" className='bg-green-600 text-white hover:bg-green-700 font-semibold rounded-lg inline-block w-auto p-3 px-7 my-10'>Submit Feedback</Link></div>
        <div className='mb-20'>
          <h2 className='text-lg font-semibold'>Top Rated Feedbacks:</h2>
          <Swiper
            slidesPerView={2}
            navigation
            pagination
            className='mt-5'
          >
            {approvedFeedback.map((item, index) => (
              <SwiperSlide key={index} className='flex justify-center items-center'>
              <div className='bg-white rounded-3xl border-2 border-light-blue flex flex-col p-6 px-10 mx-20 w-max'>
                <h1 className='text-lg font-bold'>{item.name}</h1>
                <h2 className='font-semibold text-light-blue'>Rate out of 10: {item.rating}</h2>
                <p className='mt-3'>{item.feedback}</p>
              </div>
            </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer />
    </div>
  );
}
