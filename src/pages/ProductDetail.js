//! src/pages/ProductDetail.js
import React from 'react';
// import { useParams } from 'react-router-dom';

// const ProductDetail = () => {
//   return <h1>Product Detail Page</h1>;
// };

const ProductDetail = () => {
  // const { productId } = useParams(); // You'll use this to fetch the product details from the backend

  // Placeholder content until you fetch actual product details
  const product = {
    id: 1,
    name: 'Product 1',
    price: '$10.99',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    // Add more product details here
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      {/* Add more product details here */}
    </div>
  );
};

export default ProductDetail;
