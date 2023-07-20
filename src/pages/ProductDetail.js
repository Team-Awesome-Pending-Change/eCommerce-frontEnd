//! src/pages/ProductDetail.js
import React from 'react';
import products from '../products';
// import { useParams } from 'react-router-dom'; // Uncomment this when we fetch the product details from the backend

const ProductDetail = () => {
  // const { productId } = useParams(); // Use this to fetch the product details from the backend

  // Placeholder content until we fetch actual product details
  // hardcoded productId for testing
  const productId = 2;
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <h2>Product Details</h2>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ width: '200px' }} />
      <p>{product.description}</p>
      <p>{product.price}</p>
      {/* add more product details here when we figure out what we can display */}
    </div>
  );
};


export default ProductDetail;





