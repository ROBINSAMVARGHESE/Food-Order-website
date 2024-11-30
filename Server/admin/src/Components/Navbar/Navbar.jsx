import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';


const Navbar = () => {
    return (
        <div className='navbar'>
        <div className="navbar-title-container">
          <h1 className="navbar-title">Tasty Kart</h1>
          <p className="navbar-subtitle">Admin Panel</p>
        </div>
        <img className='profile' src={assets.profile_image} alt="Profile" />
      </div>
    );
}

export default Navbar;

