import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Cart from './Pages/Cart/Cart';
import Footer from './Components/Footer/Footer';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Verify from './Pages/Verify/Verify';
import MyOrders from './Pages/MyOrders/MyOrders';



const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [category, setCategory] = useState('all');


  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Toaster />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;






