//! src/components/ProductCard.js
import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 200px;
  margin: 1rem;
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      {/* You can add more product details here */}
    </Card>
  );
};


export default ProductCard;








