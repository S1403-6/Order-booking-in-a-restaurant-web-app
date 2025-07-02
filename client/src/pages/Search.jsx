import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";

const Search = () => {
  const { products, searchTerm, cart, addToCartWithQuantity } = useAppContext();
  // quantities state seems unused currently, you can keep or remove it if not needed
  // const [quantities, setQuantities] = useState({});

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const exists = cart.some((item) => item.name === product.name);
    if (exists) {
      alert(`${product.name} is already added to the cart.`);
      return;
    }
    // Use addToCartWithQuantity with quantity = 1 (or adapt if quantity is dynamic)
    addToCartWithQuantity(product, 1);
    alert(`${product.name} added to the cart.`);
  };

  return (
    <div className="p-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtered.length > 0 ? (
        filtered.map((product, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-md p-5 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-md mb-4"
            />
            <p className="text-lg font-medium mb-2">{product.name}</p>

            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">
          No products found.
        </p>
      )}
    </div>
  );
};

export default Search;
