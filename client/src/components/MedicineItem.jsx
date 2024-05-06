import React from 'react';
import {MdShoppingCart,MdAcUnit} from 'react-icons/md';

export default function MedicineItem({ item }) {

  const { status } = item;

  if (status === 'Expired') {
    return null;
  }

  return (
  <div className="border-t-indigo-400 border-light-blue flex flex-col gap-4 w-75% sm:w-[330] rounded-2xl border-2 pl-2 p-14">
    <div className="flex flex-col">
      <div className='pl-2 flex flex-col gap-2 w-full '>
        <hr></hr>
        <MdAcUnit className='h-2 w-2 text-red-400'></MdAcUnit>
        <p className='text-xl font-semibold text-slate-700'>{item.Mname}</p>
        <img className='h-300 w-300' src={item.imageUrl} alt = "Image of medicine"/>
        <div className="flex items-center gap-1">
          <MdShoppingCart className='h-4 2-4 text-green-500'></MdShoppingCart>
          <p className='text-sm text-gray-600 truncate'>{item.Msupplier}</p>
          <p className='text-lg text-red-600 truncate'>Rs.{item.Mprice}</p>
        </div>
      </div>
    </div>
  </div>

  );
}

