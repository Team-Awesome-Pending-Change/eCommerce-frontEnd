import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import SearchBar from '../components/search/SearchBar';
import ProductGrid from './ProductGrid';
import { CartContext, CartProvider } from '../context/CartContext/CartContext';
import UserCart from './UserCart';
import { useCardStore } from '../context/CartContext/CardStore';

const StoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
`;

const StoreTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Store = () => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [cookies] = useCookies(['userCookie']);

  const userId = cookies.userCookie;
  const cartId = UserCart({ userId });

  const { addOneToCart, deleteFromCart } = useContext(CartContext);
  const { randomCardData } = useCardStore(); // Now you have access to randomCardData in Store

  // const isCardDataValid = filteredCards && Array.isArray(filteredCards);
  const cardsToRender = hasSearched
    ? filteredCards || []
    : randomCardData || [];

  const cardsToRenderArray = Array.from(cardsToRender);

  const limitedCardsToRender = cardsToRenderArray.slice(0, 30);

  return (
    <CartProvider>
      <StoreContainer>
        <StoreTitle>Store</StoreTitle>
        <Grid container>
          <Grid item xs={12}>
            <SearchBar
              filteredCards={filteredCards}
              setFilteredCards={(cards) => {
                setFilteredCards(cards || []);
                setHasSearched(
                  cards && Array.isArray(cards) && cards.length > 0
                );
              }}
            />
          </Grid>
          {/* {isCardDataValid && ( */}
          <ProductGrid
            cardsToRender={limitedCardsToRender}
            handleAddToCart={addOneToCart}
            handleRemoveCardFromCart={deleteFromCart}
            cardData={randomCardData}
          />
          {/* )} */}
        </Grid>
      </StoreContainer>
    </CartProvider>
  );
};

export default React.memo(Store);
