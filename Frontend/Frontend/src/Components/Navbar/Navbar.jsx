import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets'; // Ensure assets path is correct
import { Link,useNavigate } from 'react-router-dom'; // Ensure you import Link for routing
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');


  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate=useNavigate();

  const logout =()=>{
     localStorage.removeItem("token");
     setToken("");
     navigate("/");
  }

  return (
    <div className="navbar">
      <Link to='/'>
        <h1 className="navbar-title">Tasty Kart</h1>
      </Link>
      <ul className="navbar-menu">
        <Link to='/'
          className={menu === 'home' ? 'active' : ''}
          onClick={() => setMenu('home')}
        >
          Home
        </Link>
        <a href='#explore-menu'
          className={menu === 'menu' ? 'active' : ''}
          onClick={() => setMenu('menu')}
        >
          Menu
        </a>
        <a href='#footer'
          className={menu === 'contact' ? 'active' : ''}
          onClick={() => setMenu('contact')}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Shopping Cart" className="icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
          }

      </div>
    </div>
  );
};

export default Navbar;