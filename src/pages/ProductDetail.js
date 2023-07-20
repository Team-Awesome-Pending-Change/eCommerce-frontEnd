//! src/pages/ProductDetail.js
import React from 'react';
// import { useParams } from 'react-router-dom'; // Uncomment this when you fetch the product details from the backend


const ProductDetail = () => {
  // const { productId } = useParams(); // Use this to fetch the product details from the backend

  // Placeholder content until you fetch actual product details
  const product = {
    id: 1,
    name: 'Product 1',
    price: '$10.99',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      {/* Add more product details here when we figure out what we can display */}
    </div>
  );
};

export default ProductDetail;
