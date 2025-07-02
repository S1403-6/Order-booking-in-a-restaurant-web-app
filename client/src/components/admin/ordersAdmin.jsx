import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/Appcontext';

const AdminDashboard = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
  
    // Fetch initially
    fetchOrders();
  
    // Poll every 10 seconds
    const interval = setInterval(fetchOrders, 1000); // 10 seconds
  
    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  

  // Group orders by date
  const groupOrdersByDate = (orders) => {
    const grouped = {};
    orders.forEach((order, index) => {
      const date = new Date(order.createdAt).toLocaleDateString(); // e.g., "5/30/2025"
      if (!grouped[date]) {
        grouped[date] = [];
      }

      // Attach a numerical ID if not present
      grouped[date].push({
        ...order,
        numericId: order.orderNumber ?? index + 1, // fallback if orderNumber not present
      });
    });
    return grouped;
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/orders')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const groupedOrders = groupOrdersByDate(orders);

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
      <main className="flex-1 p-8 bg-gray-100 space-y-8">
        <Outlet />

        <div className="p-4 bg-white rounded shadow">
          <h1 className="text-xl font-bold mb-4">All Orders by Date</h1>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedOrders).map(([date, ordersOnDate]) => (
                <div key={date}>
                  <h2 className="text-lg font-semibold text-purple-800">{date}</h2>
                  <div className="space-y-4 mt-2">
                    {ordersOnDate.map((order) => (
                      <div key={order._id} className="border p-4 rounded-md shadow-md bg-gray-50">
                        <p><strong>Order ID:</strong> {order.numericId}</p>
                        <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
                        <p><strong>Address:</strong> {order.address}</p>
                        <p><strong>Total Bill:</strong> ₹{order.totalBill}</p>
                        <p><strong>Tax:</strong> ₹{order.tax}</p>
                        <p><strong>Final Amount:</strong> ₹{order.finalAmount}</p>
                        <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        <div className="mt-2">
                          <strong>Items:</strong>
                          <ul className="list-disc ml-6">
                            {order.cart.map((item, index) => (
                              <li key={index}>
                                {item.name} - {item.quantity} x ₹{item.price}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
