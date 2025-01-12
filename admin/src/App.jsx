import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { Toaster, toast } from 'react-hot-toast';
import Login from './Components/LoginCom/Login';

const url = import.meta.env.VITE_URL;
console.log(url);

const App = () => {
  const showWelcomeToast = () => {
    toast.success('Welcome to the Tasty-Kart Admin Panel!');
  };



  const [token, setToken] = useState('');

  useEffect(() => {
    showWelcomeToast();
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen'>
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar />
          <Toaster position="top-right" reverseOrder={false} />
          <hr />
          <div className="app-content" style={{ display: 'flex' }}>
            <Sidebar />
            <div className="main-content" style={{ flexGrow: 1, padding: '1rem' }}>
              <Routes>
                <Route path="/add" element={<Add url={url} />} />
                <Route path="/list" element={<List url={url} />} />
                <Route path="/orders" element={<Orders url={url} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
