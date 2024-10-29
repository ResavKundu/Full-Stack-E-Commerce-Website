import React from 'react';
import success from '../assets/success.gif';
import { NavLink } from 'react-router-dom';

const Success = () => {
  return (
    <div className='bg-white flex justify-center items-center w-full max-w-xl mx-auto flex-col my-14 p-6 shadow-lg rounded-lg'>
      <div className='animate-bounce'>
        <img src={success} alt='Success Image' className='w-64 h-64 md:w-80 md:h-80' />
      </div>
      <p className='font-bold text-blue-600 text-2xl mt-4 animate-fade-in'>Payment Successful</p>
      <NavLink to="/order">
        <button className='bg-lime-500 text-white font-semibold text-md border border-lime-500 py-2 px-6 mt-6 rounded hover:bg-lime-600 transition-transform transform hover:scale-105'>
            See Order
        </button>
      </NavLink>
    </div>
  );
};

export default Success;
