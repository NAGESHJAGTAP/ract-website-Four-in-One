import React from 'react';
import { Link } from 'react-router-dom'; 

export const Nevbar = () => {
  return (
    <div> 
    <nav>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }} className='flex justify-around  bg-gradient-to-r from-blue-500 to-green-500 text-white  h-20 place-items-center  '>
        <li className="hover:text-black">
        
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-black" >
          <Link to="/meals">Meals</Link>
        </li>
        <li className="hover:text-black">
          <Link to="/cocktail">Cocktail</Link>
        </li>
        <li className="hover:text-black">
          <Link to="/bank">Bank</Link>
        </li>
        <li className="hover:text-black">
          <Link to="/potter">Potter</Link>
        </li>
        <li className='hover:text-black'>
        <Link to="/Student">student</Link>
        </li>
      </ul>
    </nav>
   
    </div>  
  );
};

