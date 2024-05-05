import React from 'react';
import { Link } from 'react-router-dom';

{/** Make it like ZGC*/}

export default function Footer() {
  return (
    <div className='flex flex-col text-black mt-10 border-t-2 rounded-tl-full border-yellow-900/50 bg-yellow-900/50'>
      <dix className='flex gap-3 text-3xl ml-14 mt-5'>
        Got you draems to Fulfill?
        <Link to={'/search'}>
          <span className='text-white font-semibold hover:underline hover:animate-pulse'>
            Let's Connect
          </span>
        </Link>
      </dix>
      <div className='flex gap-4 justify-between mt-4 ml-14 mb-10'>
        <div className='border-t-2 border-yellow-900'>About Us</div>
        <div className='border-t-2 border-yellow-900'>Connect</div>
        <div className='border-t-2 border-yellow-900'>Address</div>
        <div className='mr-16 border-t-2 border-yellow-900'>Symbols</div>
      </div>
    </div>
  )
}