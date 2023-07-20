//! src/pages/Home.js
import React from 'react';
import products from '../products';
import ProductCard from '../components/ProductCard';


const Home = () => {
  return (
    <div>
      <h2>Welcome to our Store!</h2>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};


export default Home;





