import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section - Title, Description, and Social Icons */}
        <div className="footer-content-left">
          <h1 className="footer-title">Tasty Kart</h1>
          <p className="footer-description">
            At Tasty Kart, we strive to bring you the finest and freshest food
            options. Our goal is to deliver a delicious and enjoyable experience
            for every customer. Whether you're craving your favorite dish or trying
            something new, we've got you covered!
          </p>
          <div className="footer-social-icons">
            <h2>Social Links</h2>
            <div className="footer-icons">
              <img src={assets.facebook_icon} alt="Facebook" />
              <img src={assets.twitter_icon} alt="Twitter" />
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </div>
          </div>
        </div>

        {/* Center Section - Company Info */}
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Partner with Us</li>
          </ul>

          <h2>Legal</h2>
          <ul>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Investor Relations</li>
          </ul>
        </div>

        {/* Right Section - Explore & Locations */}
        <div className="footer-content-right">
          <h2>Explore with Tasty Kart</h2>
          <ul>
            <li>News</li>
            <li>Blog</li>
            <li>Snackables</li>
            <li>Special Offers</li>
          </ul>

          <h2>Available Locations</h2>
          <ul>
            <li>Kochi</li>
            <li>Bangalore</li>
            <li>Hyderabad</li>
            <li>Mumbai</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        Copyright 2024 @ Tasty Kart - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;





