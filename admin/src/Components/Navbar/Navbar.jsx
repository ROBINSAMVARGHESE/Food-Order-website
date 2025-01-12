import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ logoutHandler }) => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-title-container">
          <h1 className="navbar-title">Tasty Kart</h1>
          <p className="navbar-subtitle">Admin Panel</p>
        </div>
        <div className="navbar-right">
          <button
            onClick={() => {
              logoutHandler();
            }}
            className="logout-button">
            Logout
          </button>
          <img className="profile-image" src={assets.profile_image} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;







