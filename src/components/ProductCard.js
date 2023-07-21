//! src/components/ProductCard.js
import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 200px;
  margin: 1rem;

  img {
    width: 100%;
    height: auto;
  }
`;

const ProductCard = ({ product }) => {

  //? Dummy data for the product if it's not provided via props
  if (!product) {
    product = {
      id: 2,
      name: 'Doggo Hat',
      image: '../public/doggoHats.jpg',
      price: 19.99,
    };
  }


  return (
    <Card>
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} />
      <p>{product.price}</p>
      {/* You can add more product details here */}
    </Card>
  );
};


export default ProductCard;








