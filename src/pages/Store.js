import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProductCard from '../components/cards/ProductCard';
import {
  addCardDirectly,
  addCardToCartAsync,
  changeCardQuantity,
} from '../store/cart';
import { getAllCards } from '../store/cards';

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
  const cardData = useSelector((state) => state.cards);
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log('cardData', cardData);
  console.log('cartData', cartData);
  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);

  const handleAddCardToCart = (card, index) => {
    if (!card || typeof card !== 'object') {
      console.error('Invalid product');
      return;
    }

    const productWithKey = {
      ...card,
      key: `${card.id}_${index}`,
    };

    const productInCart = cartData.cart?.find(
      (card) => card.key === productWithKey.key
    );

    if (!productInCart) {
      dispatch(addCardDirectly(productWithKey)); // Directly add the card to cart
      dispatch(
        changeCardQuantity({ id: productWithKey.key, quantityChange: 1 })
      );
    }
  };

  return (
    <StoreContainer>
      <StoreTitle>Store</StoreTitle>
      {Array.isArray(cardData.cards) &&
        cardData.cards.map((card, index) => (
          <ProductCard
            key={card.id}
            card={card}
            handleAddCardToCart={handleAddCardToCart}
          />
        ))}
    </StoreContainer>
  );
};

export default React.memo(Store);
