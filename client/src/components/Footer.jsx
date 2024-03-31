import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function () {
  return (
<div>
    <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-dark-blue dark:text-white lg:text-left">
        <div className="container max-w-7xl py-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4">
                <div className="">
                    <h5 className="mb-2 font-bold">About</h5>
                    <ul className="mb-0 list-none">
                        <li>
                            <a href="#!">Terms and Conditions</a>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <h5 className="mb-2 font-bold">Customer Service</h5>
                    <ul className="mb-6 list-none">
                        <li>
                            <a href="#!">Contact Us</a>
                        </li>
                    </ul>
                    <h5 className="mb-2 font-bold">Hotline</h5>
                    <p className="mb-6 list-none">0115656994</p>
                    <h5 className="mb-2 font-bold">Email</h5>
                    <p className="mb-0 list-none">sales@kmp.lk</p>
                </div>
                <div className="">
                    <h5 className="mb-2 font-bold">KMP Pharmacy</h5>
                    <p className="mb-6 list-none">159/5, Horana Road, Kottawa.</p>
                </div>
                <div className="">
                    <div className='flex gap-2 mb-2 place-items-center'>
                        <FaFacebook className='text-lg'/> 
                        <a href='#!' className="mb-0 list-none">Facebook</a>
                    </div>
                    <div className='flex gap-2 mb-2 place-items-center'>
                        <FaInstagram className='text-lg'/> 
                        <a href='#!' className="mb-0 list-none">Instagram</a>
                    </div>
                    <div className='flex gap-2 mb-6 place-items-center'>
                        <FaTwitter className='text-lg'/> 
                        <a href='#!' className="mb-0 list-none">Twitter</a>
                    </div>
                    <h5 className="mb-2 font-bold">Colombo City Limits and Suburbs</h5>
                    <p className="mb-6 list-none">Delivery with in 24hrs subject to availability of stocks.</p>
                </div>
            </div>
        </div>
        <div className="w-full bg-blue p-4 text-center">© kmppharmacy.lk : All Rights Reserved.</div>
    </footer>
</div>
  )
}
