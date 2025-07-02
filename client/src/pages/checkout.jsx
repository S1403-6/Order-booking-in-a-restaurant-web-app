import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, setCart, user, loading: authLoading } = useAppContext();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [authLoading, user, navigate]);

  if (authLoading) {
    return <div className="p-10 text-center">Checking authentication...</div>;
  }

  const sanitizedCart = cart.map(({ name, price, quantity }) => ({
    name,
    price,
    quantity,
  }));

  const totalBill = sanitizedCart.reduce((acc, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    return acc + price * quantity;
  }, 0);

  const tax = totalBill * 0.18;
  const finalAmount = totalBill + tax;

  const handleConfirmOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/order/place-order", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: sanitizedCart,
          address,
          totalBill,
          tax,
          finalAmount,
        }),
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response: ${text}`);
      }

      if (response.ok) {
        alert("Order placed successfully! You'll be redirected to previous orders.");
        setCart([]);
        navigate("/prevorders");
      } else {
        alert(`Failed to place order: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-20 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="mb-6">
  <label className="block font-medium mb-2">Table Number</label>
  <input
    type="text" // or "number" if you want numeric only
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="Enter your table number..."
    className="w-1/2 border rounded p-3"
  />
</div>


      <div className="border rounded p-5 shadow-md bg-gray-50">
        <p className="mb-2 font-medium">Bill: ₹{totalBill.toFixed(2)}</p>
        <p className="mb-2 font-medium">Tax (18% GST): ₹{tax.toFixed(2)}</p>
        <p className="text-xl font-bold mt-4">Final Amount: ₹{finalAmount.toFixed(2)}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/userdetails")}
          className="bg-gray-400 text-white px-6 py-3 rounded hover:bg-gray-500 w-1/2"
        >
          Go to Cart
        </button>

        <button
          onClick={handleConfirmOrder}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-1/2"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
