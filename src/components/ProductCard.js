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
    //? Dummy data for the product if it's not provided via props
    if (!product) {
      product = {
        id: 0,
        name: 'Dummy Product',
        price: '$0.00',
      };
    }

  return (
    <Card>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      {/* You can add more product details here */}
    </Card>
  );
};


export default ProductCard;








