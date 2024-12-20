import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders'; 
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const showWelcomeToast = () => {
    toast.success('Welcome to the Tasty-Kart Admin Panel!');
  };

  const url = import.meta.env.VITE_URL;
  console.log(url);
  

  React.useEffect(() => {
    showWelcomeToast(); 
  }, []);

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

