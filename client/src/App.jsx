import React from 'react';
import { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import { useAppContext } from './context/Appcontext';
import AllProducts from './pages/allproducts';
import Orders from './pages/orders.jsx';
import Search from './pages/Search';
import Checkout from "./pages/checkout";
import AdminLogin from './components/admin/adminlogin';
import AdminDashboard from './components/admin/admindash';
import AdminCustomers from './components/admin/customers';
import Ordersadmin from './components/admin/ordersAdmin';
import UserOrders from './pages/UserOrders';
import Prevorders from './pages/prevorders';  

const App = () => {
  // const { ShowUserLogin, setShowUserLogin } = useAppContext();
  const { ShowUserLogin, setShowUserLogin, loading } = useAppContext();

if (loading) {
  return <div className="text-center mt-20 text-lg font-bold">Loading...</div>;
}


  return (
    <div>
      <Toaster />
      <Navbar />
      {ShowUserLogin && <Login closeLogin={() => setShowUserLogin(false)} />}
      <div>
        <Routes>
          {/* User-facing routes */}
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<AllProducts />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/search' element={<Search />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/myorders' element={<UserOrders />} />
          <Route path='/prevorders' element={<Prevorders />} /> {/* ✅ Added */}

          {/* Admin-facing routes */}
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/customers' element={<AdminCustomers />} />
          <Route path='/admin/orders' element={<Ordersadmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
