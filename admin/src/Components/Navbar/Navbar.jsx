import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div >
      <div className='navbar'>
      <div className="navbar-title-container">
        <h1 className="navbar-title">Tasty Kart</h1>
        <p className="navbar-subtitle">Admin Panel</p>
      </div>
      <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition duration-200">
        Logout
      </button>
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
    </div>
    
  );
};

export default Navbar;




