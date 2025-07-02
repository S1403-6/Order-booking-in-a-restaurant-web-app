import React from "react";
import { categories } from "../assets/assets"; // Make sure this path is correct

const Categories = () => {
  return (
    <div className="p-6 space-y-10">
      {categories.map((category) => (
        <div key={category.path}>
          {/* Category Heading */}
          <h2 className="text-2xl font-bold mb-4">
            {category.text}
          </h2>

          {/* Images under each category */}
          <div className="flex flex-wrap gap-10">
            {Array.isArray(category.image) ? (
              category.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${category.text} ${index + 1}`}
                  className="w-40 h-40 object-cover rounded-md shadow-md"
                />
              ))
            ) : (
              <img
                src={category.image}
                alt={category.text}
                className="w-40 h-40 object-cover rounded-md shadow-md"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
