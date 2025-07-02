import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setShowUserLogin,
    setUser,
    searchTerm,
    setSearchTerm,
    loading, 
  } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate('/search');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/logout', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setUser(null);
        console.log("User logged out.");
      } else {
        console.log("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleHomeWithAlert = () => {
    const confirmLeave = window.confirm(
      "Going to Home will clear your cart details. Are you sure?"
    );
    if (confirmLeave) {
      navigate('/');
    }
  };

  return (
    <nav className="bg-blue-600 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-white font-extrabold text-2xl">Restauranto</div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" className="text-white font-medium hover:text-yellow-300">Home</NavLink>

            {!loading && user && (
              <>
                <NavLink to="/menu" className="text-white font-medium hover:text-yellow-300">Menu</NavLink>

                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-3 py-1 rounded-md focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                />

                <NavLink to="/orders" className="text-white font-medium hover:text-yellow-300">Orders</NavLink>
                <NavLink to="/prevorders" className="text-white font-medium hover:text-yellow-300">Previous Orders</NavLink>

                {(location.pathname === '/checkout' || location.pathname === '/orders') && (
                  <button
                    onClick={handleHomeWithAlert}
                    className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm hover:bg-gray-100"
                  >
                    Go to Home
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-300"
                >
                  Logout
                </button>
              </>
            )}

            {!loading && !user && (
              <button
                onClick={() => setShowUserLogin(true)}
                className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-100"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
