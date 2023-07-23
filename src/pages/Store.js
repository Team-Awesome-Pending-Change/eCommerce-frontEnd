import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProductCard from '../components/cards/ProductCard';
import { addProductToCart } from '../store/cart';
import {
  getAllCards,
  getCardByName,
  getCardByType,
  getCardByAttribute,
} from '../store/cards/cards';
// import Search from '../components/search/Search';

const StoreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f7f7f7;
`;

const StoreTitle = styled.h2`
  grid-column: span 3;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Store = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);

  const cards = useSelector((state) => state.cards); // assuming your cards are stored directly under state.cards

  const handleAddToCart = (card) => {
    dispatch(addProductToCart(card));
  };

  return (
    <StoreContainer>
      <StoreTitle>Store</StoreTitle>
      {/* <Search /> */}
      {cards &&
        cards.map((card) => (
          <ProductCard
            key={card.id}
            card={card}
            handleAddToCart={() => handleAddToCart(card)}
          />
        ))}
    </StoreContainer>
  );
};

export default Store;
