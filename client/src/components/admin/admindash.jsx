import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/Appcontext';

const AdminDashboard = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  
  

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="bg-purple-800 text-white shadow-md flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">ADMIN PANEL - Restauranto</h1>
        <div className="space-x-4">
          <Link to="/admin/customers" className="bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-100 transition">Customers</Link>
          <Link to="/admin/orders" className="bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-100 transition">Orders</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
