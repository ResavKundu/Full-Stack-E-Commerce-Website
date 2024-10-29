import React from 'react'
import cancel from '../assets/cancel.gif';
import { NavLink } from 'react-router-dom';
const Cancle = () => {
  return (
    <>
        <div className='bg-white flex justify-center items-center w-full max-w-xl mx-auto flex-col my-14 p-6 shadow-lg rounded-lg'>
            <div className=''>
            <img src={cancel} alt='Success Image' className='w-64 h-64 md:w-80 md:h-80 mix-blend-multiply' />
            </div>
            <p className='font-bold text-red-600 text-2xl mt-4 animate-fade-in'>Payment Cancel</p>
            <NavLink to="/cart"><button className='bg-red-600 text-white font-semibold text-md border border-red-500 py-2 px-6 mt-6 rounded hover:bg-red-600 transition-transform transform hover:scale-105'>
                Go To Cart
            </button></NavLink>
       </div>
    </>
  )
}

export default Cancle