import React, { useEffect } from "react";
import { useAppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const {
    user,
    loading: authLoading,
    products,
    cart,
    addToCartWithQuantity,
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [authLoading, user, navigate]);

  const handleAddToCart = (product) => {
    const exists = cart.some((item) => item.name === product.name);
    if (exists) {
      alert(`${product.name} is already added to the cart.`);
      return;
    }
    addToCartWithQuantity(product, 1);
  };

  return (
    <div className="p-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={index}
          className="border rounded-xl shadow-md p-5 flex flex-col items-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-40 h-40 object-cover rounded-md mb-4"
          />
          <p className="text-lg font-medium mb-1">{product.name}</p>
          <p className="text-sm text-gray-700 mb-3">Price: ₹{product.price}</p>

          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
