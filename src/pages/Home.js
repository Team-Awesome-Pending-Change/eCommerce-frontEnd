//! src/pages/Home.js
import React from 'react';
import styled from 'styled-components';
import products from '../products';
import ProductCard from '../components/ProductCard';


const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;


const Home = () => {
  return (
    <div>
      <h2>Welcome to our Store!</h2>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </div>
  );
};


export default Home;





