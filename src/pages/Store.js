import React, { useState, useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import SearchBar from '../components/search/SearchBar';
import ProductGrid from './ProductGrid';
import { CartContext } from '../context/CartContext/CartContext';
import { useCardStore } from '../context/CartContext/CardStore';
import { BeatLoader } from 'react-spinners';

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
  const { addOneToCart, deleteFromCart, fetchUserCart, loading, error } =
    useContext(CartContext);
  const { cardsArray } = useCardStore(); // Use the useCardStore hook to access cardsArray
  console.log('cardsArray', cardsArray);
  // console.log('filteredCards', filteredCards);

  const userId = cookies.userCookie?.id; // Update the way to get the userId

  const cardsToRender = hasSearched ? filteredCards || [] : cardsArray || [];
  const cardsToRenderArray = useMemo(
    () => Array.from(cardsToRender),
    [cardsToRender]
  );
  const limitedCardsToRender = useMemo(
    () => cardsToRenderArray.slice(0, 30),
    [cardsToRenderArray]
  );

  useEffect(() => {
    if (userId) {
      fetchUserCart(userId).catch((err) =>
        console.error('Failed to get user cart', err)
      );
    }
  }, [userId, fetchUserCart]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <BeatLoader color={'#123abc'} loading={loading} size={24} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <StoreContainer>
      <StoreTitle>Store</StoreTitle>
      <Grid container>
        <Grid item xs={12}>
          <SearchBar
            filteredCards={cardsToRender}
            setFilteredCards={(cards) => {
              setFilteredCards(cards);
              setHasSearched(true);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ProductGrid
            cardsArray={limitedCardsToRender}
            handleAddToCart={addOneToCart}
            handleRemoveCardFromCart={deleteFromCart}
          />
        </Grid>
      </Grid>
    </StoreContainer>
  );
};

export default Store;
