import React from 'react';
import Categories from '../components/Categories';

const Home = () => {
  return (
    <main className="pt-24 px-4 max-w-5xl mx-auto">
      {/* Adjust pt-24 depending on your navbar height */}
      <div className="bg-yellow-100 border-4 border-yellow-400 rounded-xl shadow-lg p-8 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif">
          Welcome to Restauranto!
        </h1>
      </div>
      <Categories />
    </main>
  );
};

export default Home;
