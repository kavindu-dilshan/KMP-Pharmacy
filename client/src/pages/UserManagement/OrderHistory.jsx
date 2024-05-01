import React from 'react'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'

export default function OrderHistory() {
  return (
    <div className='bg-paleblue' >
    <NavigationBar/>
    <h1 className='text-3xl text-center font-semibold my-7'>My Orders</h1>
    <div className='px-10 flex-1'>
    <table className="w-full border-2 border-light-blue mb-7">
        <thead>
            <tr className="bg-light-blue text-white text-left">
                <th className="border border-light-blue px-4 py-2">Order ID</th>
                <th className="border border-light-blue px-4 py-2">Date Ordered</th>
                <th className="border border-light-blue px-4 py-2">Payment Status</th>
                <th className="border border-light-blue px-4 py-2">Transaction ID</th>  
                <th className="border border-light-blue px-4 py-2">Order Status</th>  
                
            </tr>
            </thead>
    </table>
    </div>
    <Footer/>   
    </div>
  )
}
