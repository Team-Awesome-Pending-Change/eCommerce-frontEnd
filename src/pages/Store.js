import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCookies } from 'react-cookie';
import ProductCard from '../components/cards/ProductCard';
import SearchBar from '../components/search/SearchBar';
import {
  asyncActions,
  asyncActions as cartActions,
} from '../store/reducers/cart';
import axios from 'axios';

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
  const [cookies] = useCookies(['userCookie']);

  const classes = useStyles();
  const [hasSearched, setHasSearched] = useState(false);
  const [cartId, setCartId] = useState(null);
  const cardData = useSelector((storefrontState) => storefrontState.cards);
  const cartData = useSelector((storefrontState) => storefrontState.cart);
  console.log('cartData', cartData);
  const dispatch = useDispatch();

  const userId = cookies.userCookie;

  const getAllCartsAndFindUserCart = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/carts`
      );

      if (response.data && response.data.length > 0) {
        const userCart = response.data.find((cart) => cart.userId === userId);
        if (userCart) {
          return userCart.id;
        } else {
          const createResponse = await axios.post(
            `${process.env.REACT_APP_SERVER}/api/carts`,
            { userId }
          );
          return createResponse.data.id;
        }
      }
    } catch (error) {
      console.error('Error while fetching/creating the user cart', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCartId = async () => {
      const id = await getAllCartsAndFindUserCart(userId);
      setCartId(id);
    };

    fetchCartId();
  }, []);

  const handleAddToCart = useCallback(
    (card, index) => {
      dispatch(
        asyncActions.addToCart({
          id: userId,
          cardId: card.id,
          cartId: cartId,
        })
      );

      if (
        !filteredCards ||
        !Array.isArray(filteredCards) ||
        !filteredCards[index]
      ) {
        console.error('Invalid product');
        return;
      }

      const cardWithKey = {
        ...card,
        key: `${index}_${Math.random()}`,
      };

      const maxQuantity = 3;
      let num = 1;
      let found = false;

      if (cartData && Array.isArray(cartData)) {
        for (let i = 0; i < cartData.length; i++) {
          if (
            cartData[i].card.id === card.id &&
            cartData[i].quantity < maxQuantity
          ) {
            num = cartData[i].quantity + 1;
            cartData[i].quantity = num;
            found = true;
            break;
          }
        }

        if (!found) {
          cartData.push({ card: cardWithKey, quantity: num });
        }

        dispatch(
          cartActions.updateCart({
            userId,
            cartData,
          })
        ).catch((error) => console.error('Error while updating cart', error));
      }
    },
    [dispatch, userId, cartData, filteredCards, cartId]
  );

  const handleRemoveCardFromCart = useCallback(
    (card) => {
      if (!card || typeof card !== 'object') {
        console.error('Invalid product');
        return;
      }

      dispatch(cartActions.removeFromCart(card.key)).catch((error) =>
        console.error('Error while removing product from cart', error)
      );
    },
    [dispatch]
  );

  const isCardDataValid = filteredCards && Array.isArray(filteredCards);
  const cardsToRender = hasSearched ? filteredCards : filteredCards;
  console.log('filteredCards', filteredCards);
  console.log('cardData', cardData);
  let cardsToRenderArray = Array.from(cardsToRender);

  const limitedCardsToRender = cardsToRenderArray.slice(0, 30);

  return (
    <StoreContainer>
      <StoreTitle>Store</StoreTitle>
      <Grid container>
        <Grid item xs={12}>
          <SearchBar
            filteredCards={filteredCards}
            setFilteredCards={(cards) => {
              setFilteredCards(cards || []);
              setHasSearched(cards && Array.isArray(cards) && cards.length > 0);
            }}
          />
        </Grid>
        <ProductsGrid item xs={12} container>
          {isCardDataValid &&
            limitedCardsToRender.map((card, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={card.id}
                className={classes.gridItem}
              >
                <ProductCard
                  card={card}
                  handleAddToCart={() => handleAddToCart(card, index)}
                  handleRemoveCardFromCart={() =>
                    handleRemoveCardFromCart(card)
                  }
                  cartData={cartData}
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
