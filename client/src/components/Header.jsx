import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-black shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-red-800'>Next</span>
                    <span className='text-red-700'>Step</span>
                    <span className='text-red-600'>Nest</span>
                </h1>
            </Link>
            <ul className='flex gap-4 items-center'>
                <Link to='/'>
                <li className='hidden sm:inline text-white hover:underline hover:text-red-700 hover:text-xl'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-white hover:underline hover:text-red-700 hover:text-xl'>About</li>
                </Link>
                <Link to='/sign-in'>
                <li className='hidden sm:inline text-white hover:underline hover:text-red-700 hover:text-xl'>SignIn</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
