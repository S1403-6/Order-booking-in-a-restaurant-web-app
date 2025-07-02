import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/Appcontext';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        } else {
          setError('Failed to load users.');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Could not connect to backend.');
      });
  }, []);

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
          <Link
            to="/admin/customers"
            className="bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-100 transition"
          >
            Customers
          </Link>
          <Link
            to="/admin/orders"
            className="bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-100 transition"
          >
            Orders
          </Link>
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
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Registered Customers</h2>
          {error && <p className="text-red-600">{error}</p>}
          <ul className="list-disc pl-5 space-y-2">
            {users.map((user, idx) => (
              <li key={idx}>
                {user.name} – {user.email}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Customers;
