import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Header.css';

// Import images
import { assets } from '../../assets/assets';

const Header = () => {
  return (
    <div className="header">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={assets.header_img} alt="First slide" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={assets.burger_delicious} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={assets.combo_food} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <div className="header-contents">
        <h3>Order your favorite food here</h3>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
