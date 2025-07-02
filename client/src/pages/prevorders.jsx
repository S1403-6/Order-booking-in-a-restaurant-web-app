import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';

const Prevorders = () => {
  const { user, loading: authLoading } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const groupOrdersByDate = (orders) => {
    const grouped = {};
    orders.forEach((order, index) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push({
        ...order,
        numericId: order.orderNumber ?? index + 1,
      });
    });
    return grouped;
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/'); // 👈 redirect if user is not logged in
      return;
    }

    if (user) {
      const fetchOrders = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/order/my-orders", {
            credentials: "include",
          });

          const data = await res.json();
          if (data.success) {
            setOrders(data.orders);
          } else {
            console.error("Error:", data.message);
          }
        } catch (err) {
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [user, authLoading]);

  const groupedOrders = groupOrdersByDate(orders);

  if (authLoading || loading) return <div className="p-8">Loading your orders...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Previous Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet. Start ordering from the menu!</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedOrders).map(([date, ordersOnDate]) => (
            <div key={date}>
              <h2 className="text-lg font-semibold text-blue-700">{date}</h2>
              <div className="space-y-4 mt-2">
                {ordersOnDate.map((order) => (
                  <div key={order._id} className="border p-4 rounded bg-white shadow">
                    <p><strong>Table Number:</strong> {order.address}</p>
                    <p><strong>Total Bill:</strong> ₹{order.totalBill}</p>
                    <p><strong>Tax:</strong> ₹{order.tax}</p>
                    <p><strong>Final Amount:</strong> ₹{order.finalAmount}</p>
                    <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    <div className="mt-2">
                      <strong>Items:</strong>
                      <ul className="list-disc ml-6">
                        {order.cart.map((item, idx) => (
                          <li key={idx}>{item.name} - {item.quantity} x ₹{item.price}</li>
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
  );
};

export default Prevorders;
