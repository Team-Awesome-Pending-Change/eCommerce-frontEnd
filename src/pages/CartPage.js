// CartPage.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCartAsync,
  fetchAllCartsAsync,
  updateCartAsync,
} from '../store/cart';
import { Cookies } from 'react-cookie';
import {
  Box,
  Card as CardElement,
  CardContent,
  Container,
} from '@mui/material';
import CartContent from './CartContent';
import CustomerForm from './CustomerForm';

const cookies = new Cookies();

const CartPage = () => {
  const user = cookies.get('userCookie');
  const userId = user?.id;

  const cardData = useSelector((state) => state.cards);
  const cartData = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const [cart, setCart] = useState(cartData);

  useEffect(() => {
    dispatch(fetchAllCartsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      const userCart = cartData.find((cart) => cart.userId === userId);
      if (userCart) {
        dispatch(fetchCartAsync(userCart.id));
        setCart(userCart);
      }
    }
  }, [dispatch, userId, cartData]);

  useEffect(() => {
    if (cart.length !== cartData.length) {
      dispatch(updateCartAsync(cart));
    }
  }, [dispatch, cart, cartData]);
  console.log('cartData', cartData);
  // const calculateTotalPrice = () =>
  //   cartData.reduce((total, item) => total + item.totalPrice, 0);
  // 	card_prices[0].tcgplayer_price
  // const calculateTotalPrice = () =>
  //   cartData.reduce(
  //     (total, card) =>
  //       total + card.card_prices[0].tcgplayer_price * card.quantity,
  //     0
  //   );
  const calculateTotalPrice = () =>
    cartData.reduce(
      (total, item) => total + item.card_prices[0].tcgplayer_price,
      0
    );
  console.log('calculateTotalPrice', calculateTotalPrice);
  console.log('cartData', cartData);
  return (
    <Container>
      <Box
        sx={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          flexGrow: '1',
        }}
      >
        <CardElement sx={{ width: '90%', padding: '1rem' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexGrow: '1',
              }}
            >
              <Box sx={{ flex: 1, marginRight: '2rem', flexGrow: '1' }}>
                <CartContent
                  cartData={cartData}
                  calculateTotalPrice={calculateTotalPrice}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <CustomerForm calculateTotalPrice={calculateTotalPrice} />
              </Box>
            </Box>
          </CardContent>
        </CardElement>
      </Box>
    </Container>
  );
};

export default CartPage;
