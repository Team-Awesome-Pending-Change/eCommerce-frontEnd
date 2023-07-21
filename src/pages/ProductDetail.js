//! src/pages/ProductDetail.js
import React from 'react';
import styled from 'styled-components';
import products from '../products';
import ProductCard from '../components/ProductCard';
// import { useParams } from 'react-router-dom'; // Uncomment this when we fetch the product details from the backend

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

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
      <ProductGrid>
        <ProductCard product={product} />
      </ProductGrid>

    </div>
  );
};


export default ProductDetail;
