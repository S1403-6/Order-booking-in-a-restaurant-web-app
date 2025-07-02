import React, { useEffect } from "react";
import { useAppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { cart, setCart, user, loading: authLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [authLoading, user, navigate]);

  if (authLoading) {
    return <div className="p-8 text-center">Checking authentication...</div>;
  }

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const totalBill = cart.reduce((acc, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    return acc + price * quantity;
  }, 0);

  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between space-x-4 border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <select
                      className="border rounded p-1 mt-1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Qty: {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="text-lg font-semibold">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t pt-4 text-right text-xl font-bold">
            Total Bill: ₹{totalBill}
          </div>
          <div className="mt-4 text-right">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
