import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProductCard from '../components/cards/ProductCard';
import {
  addCardToCartAsync,
  changeCardQuantity,
  removeCardFromCartAsync,
  removeCardFromCart,
  cartAsyncActions,
} from '../store/reducers/cart';
// import SearchBar from '../components/search/SearchBar';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { loadCardsFromAPI } from '../store/reducers/card';
import SearchBar from '../components/search/SearchBar';

const useStyles = makeStyles(() => ({
  gridItem: {
    padding: '10px',
  },
}));

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

const ProductsGrid = styled(Grid)`
  overflow: auto;
  max-height: 600px;
`;

const Store = () => {
  const [filteredCards, setFilteredCards] = useState([]);
  const classes = useStyles();

  const cardData = useSelector((storefrontState) => storefrontState.cards);
  const cart = useSelector((storefrontState) => storefrontState.cart);
  const dispatch = useDispatch();
  console.log('cards', cardData);
  // console.log('cart', cart);

  const handleAddToCart = (card, index) => {
    if (!card || typeof card !== 'object') {
      console.error('Invalid product');
      return;
    }

    const cardWithKey = {
      ...cardData,
      key: `${index}_${Math.random()}`,
    };

    const cardInCart =
      Array.isArray(cardData.items) &&
      cardData.items.find((item) => item.key === cardWithKey.key);
    console.log('productInCart', cardInCart);
    try {
      if (!cardInCart) {
        dispatch(cartAsyncActions.handleAddToCart(cardWithKey)); // For adding a card to cart
        dispatch(
          changeCardQuantity({ id: cardWithKey.key, quantityChange: 1 })
        );
      } else {
        const quantityChange = 1;
        dispatch(changeCardQuantity({ id: cardWithKey._id, quantityChange }));
      }
    } catch (error) {
      console.error('Error while adding product to cart', error);
    }
  };

  const handleRemoveProductFromCart = (card, index) => {
    if (!card || typeof card !== 'object') {
      console.error('Invalid product');
      return;
    }

    try {
      dispatch(removeCardFromCart(card, index));
    } catch (error) {
      console.error('Error while removing product from cart', error);
    }
  };

  const handleSearch = (results) => {
    if (!Array.isArray(results)) {
      console.error('Invalid search results');
      return;
    }
    setFilteredCards(results);
  };

  useEffect(() => {
    try {
      dispatch(loadCardsFromAPI());
    } catch (error) {
      console.error('Error while loading cards', error);
    }
  }, [dispatch]);

  console.log('cardData', cardData);
  console.log('cartData', cart);
  console.log('filteredCards', cardData.cardList);
  console.log('filteredCards', cardData.cardList?.length);

  return (
    <StoreContainer>
      <StoreTitle>Store</StoreTitle>
      <Grid container>
        <Grid item xs={12}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <ProductsGrid item xs={12} container>
          {/* {(Array.isArray(filteredCards) ? filteredCards : cardData).map( */}
          {cardData.cards &&
            Array.isArray(cardData.cards) &&
            cardData.cards.map((card, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={cardData.id}
                className={classes.gridItem}
              >
                <ProductCard
                  card={card}
                  handleAddToCart={() => handleAddToCart(card, index)}
                  handleRemoveProductFromCart={() =>
                    handleRemoveProductFromCart(card, index)
                  }
                  cartData={cart}
                  cardData={cardData}
                />
              </Grid>
            ))}
        </ProductsGrid>
      </Grid>
    </StoreContainer>
  );
};

export default React.memo(Store);
