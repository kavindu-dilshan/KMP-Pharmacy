import React, { useState, useEffect } from 'react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import promotion_1 from '../../assets/promotion-1.png'
import promotion_2 from '../../assets/promotion-2.png'

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function PromotionPage() {
  const [promotions, setPromotions] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

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
        }
      })
      .then(data => {
        const activePromotions = data.promotion.filter(promotion => new Date(promotion.expiredAt) > new Date());
        setPromotions(activePromotions);
      })
      .catch(error => {
        console.error('Error fetching promotions:', error);
      });
  };

  const formatDate = (datetimeString) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(datetimeString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
    return formattedDate;
  };
  
  const togglePopup = (promotion) => {
    setSelectedPromotion(promotion);
    setPopupVisible(!popupVisible);
  };

  return (
    <div className='bg-paleblue'>
      <NavigationBar />
      <div className='max-w-7xl mx-auto p-3 mt-10'>
        <h1 className='text-center text-4xl text-blue font-bold'>Discounts and Offers</h1>
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <img src={promotion_1} alt='Promotion_1' className='w-full object-cover mt-16 mb-10' />
          </SwiperSlide>
          <SwiperSlide>
            <img src={promotion_2} alt='Promotion_2' className='w-full object-cover mt-16 mb-10' />
          </SwiperSlide>
        </Swiper>
        <div className='mt-8'>
          <h2 className='text-lg font-semibold'>Seasonal Offers:</h2>
          <Swiper
            slidesPerView={2}
            navigation
            pagination
            className='mt-5'
          >
            {promotions.map((promotion, index) => (
              promotion.type === 'Seasonal' && (
                <SwiperSlide key={index} className='flex justify-center items-center'>
                  <div className='bg-white rounded-lg border-2 border-light-blue flex w-max'>
                    <div className='bg-light-blue w-max p-2'>
                      <div className='border border-white w-max h-full p-3 flex flex-col items-center justify-center'>
                        <h1 className='text-white text-3xl font-bold'>RS {promotion.couponPrice}</h1>
                        <h1 className='text-white text-2xl'>Off</h1>
                        <button className='bg-white text-light-blue font-semibold p-1 px-3 rounded-md mt-3' onClick={() => togglePopup(promotion)}>View Details</button>
                      </div>
                    </div>
                    <div className='p-6 px-8'>
                      <h1 className='font-bold'>WITH MIN SPEND RS {promotion.totalAmount}</h1>
                      <h1 className='text-light-blue text-2xl font-bold mt-2 mb-2'>USE CODE: {promotion.couponCode}</h1>
                      <h2 className='text-sm'>VALID TILL: {formatDate(promotion.expiredAt)}</h2>
                      <h2 className='text-sm'>*T&C Applied</h2>
                    </div>
                  </div>
                </SwiperSlide>
              )
            ))}
          </Swiper>
          {popupVisible && selectedPromotion && (
          <>
          <div className="fixed top-0 left-0 w-full h-full bg-dark-blue bg-opacity-60 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-50 flex flex-col items-center justify-center">
            <h1 className="font-semibold mb-4">{selectedPromotion.description}</h1>
            <button onClick={() => togglePopup(null)} className="bg-light-blue text-white font-semibold px-4 py-2 rounded-md">Close</button>
          </div>
          </>)}
        </div>
        <div className='mt-8 mb-20'>
          <h2 className='text-lg font-semibold'>Special Offers:</h2>
          <Swiper
            slidesPerView={2}
            navigation
            pagination
            className='mt-5'
          >
            {promotions.map((promotion, index) => (
              promotion.type === 'Special' && (
                <SwiperSlide key={index} className='flex justify-center items-center'>
                  <div className='bg-white rounded-lg border-2 border-blue flex w-max'>
                    <div className='bg-blue w-max p-2'>
                      <div className='border border-white w-max h-full p-3 flex flex-col items-center justify-center'>
                        <h1 className='text-white text-3xl font-bold'>RS {promotion.couponPrice}</h1>
                        <h1 className='text-white text-2xl'>Off</h1>
                        <button className='bg-white text-blue font-semibold p-1 px-3 rounded-md mt-3' onClick={() => togglePopup(promotion)}>View Details</button>
                      </div>
                    </div>
                    <div className='p-6 px-8'>
                      <h1 className='font-bold'>WITH MIN SPEND RS {promotion.totalAmount}</h1>
                      <h1 className='text-blue text-2xl font-bold mt-2 mb-2'>USE CODE: {promotion.couponCode}</h1>
                      <h2 className='text-sm'>VALID TILL: {formatDate(promotion.expiredAt)}</h2>
                      <h2 className='text-sm'>*T&C Applied</h2>
                    </div>
                  </div>
                </SwiperSlide>
              )
            ))}
          </Swiper>
        </div>
      </div>
      <Footer />
    </div>
  );
}
