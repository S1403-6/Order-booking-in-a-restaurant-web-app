import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext'; // adjust if path differs

const UserOrders = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/order/my-orders", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrders(data.orders);
      })
      .catch(err => console.error("Failed to fetch user orders:", err));
  }, []);
  

  const groupOrdersByDate = (orders) => {
    const grouped = {};
    orders.forEach((order, index) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (!grouped[date]) grouped[date] = [];

      grouped[date].push({
        ...order,
        numericId: order.orderNumber ?? index + 1,
      });
    });
    return grouped;
  };

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        Object.entries(groupedOrders).map(([date, orders]) => (
          <div key={date} className="mb-6">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">{date}</h2>
            {orders.map(order => (
              <div key={order._id} className="bg-white shadow rounded p-4 mb-4 border">
                <p><strong>Order ID:</strong> {order.numericId}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Total Bill:</strong> ₹{order.totalBill}</p>
                <p><strong>Tax:</strong> ₹{order.tax}</p>
                <p><strong>Final Amount:</strong> ₹{order.finalAmount}</p>
                <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul className="list-disc ml-5">
                    {order.cart.map((item, i) => (
                      <li key={i}>
                        {item.name} - {item.quantity} × ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
