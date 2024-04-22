import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className='bg-black shadow-md hover:bg-zinc-900'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer'>
                    <span className='text-red-700 text-3xl'>Next</span>
                    <span className='text-red-600 text-3xl'>Step</span>
                    <span className='text-red-500 text-3xl'>Nest</span>
                </h1>
            </Link>
            <ul className='flex gap-4 items-center'>
                <Link to='/'>
                    <li className='hidden sm:inline text-white hover:underline hover:text-red-700 hover:text-xl'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-white hover:underline hover:text-red-700 hover:text-xl'>About</li>
                </Link>
                <Link to='/profile'>
                    {currentUser ? 
                        (<img className='rounded-full h-8 w-8 object-cover' src={currentUser.avatar} alt='profile'/>)
                        : (<li className='hidden sm:inline text-white hover:underline hover:text-red-700 hover:text-xl'>SignIn</li>)
                    }
                
                </Link>
            </ul>
        </div>
    </header>
  )
}
