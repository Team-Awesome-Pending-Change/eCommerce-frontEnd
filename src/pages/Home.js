//! src/pages/Home.js
import React from 'react';
import ProductCard from '../components/ProductCard';

// const Home = () => {
//   return <h1>Welcome to the Home Page!</h1>;
// };


const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$10.99',
    // Add more product details here
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$15.99',
    // Add more product details here
  },

];

const Home = () => {
  return (
    <div>
      <h2>Welcome to our E-Commerce Store!</h2>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
