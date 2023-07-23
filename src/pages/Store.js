// Importing necessary modules and components
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProductCard from '../components/cards/ProductCard';
import { addCardToCartAsync, changeCardQuantity } from '../store/cart';
import { getAllCards } from '../store/cards';

// Styled component for the store container
const StoreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f7f7f7;
`;

// Styled component for the store title
const StoreTitle = styled.h2`
  grid-column: span 3;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

// Store component
const Store = () => {
  const cardData = useSelector((state) => state.cards);
  console.log(cardData);
  const cartData = useSelector((state) => state.cart);
  console.log(cartData);
  const dispatch = useDispatch();

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
    console.log(productWithKey);
    const productInCart = cartData.items?.find(
      (item) => item.key === productWithKey.key
    );

    if (!productInCart) {
      dispatch(addCardToCartAsync(productWithKey));
      dispatch(
        changeCardQuantity({ id: productWithKey.key, quantityChange: 1 })
      );
    } else {
      dispatch(
        changeCardQuantity({ id: productWithKey.id, quantityChange: 1 })
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
            handleAddToCart={() => handleAddCardToCart(card, index)}
          />
        ))}
    </StoreContainer>
  );
};

export default React.memo(Store);
