import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeCardQuantity,
  removeCardFromCartAsync,
  fetchCartAsync,
  // fetchAllCartsAsync,
  pushToServerCartAsync,
} from '../store/reducers/cart';
import { fetchAllCartsAsync } from './store/reducers/cart';
import { Cookies } from 'react-cookie';
import {
  Box,
  Card as CardElement,
  CardContent,
  Container,
} from '@mui/material';
import CartContent from '../components/content/CartContent';
import CustomerForm from '../components/forms/CustomerForm';

const cookies = new Cookies();

const CartPage = () => {
  const dispatch = useDispatch();
  const user = cookies.get('userCookie');
  const userId = user?.id;

  const productData = useSelector((state) => state.products);
  const cartData = useSelector((state) => state.cart.cart);
  const cartState = useSelector((storefrontState) => storefrontState.cart);
  console.log('cart state', cartState);
  const [fetchedCartId, setFetchedCartId] = useState(null);
  const [activeUserCartId, setActiveUserCart] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllCartsAsync({}));
      const userCart = cartState.allCarts.find(
        (cart) => cart.userId === userId
      );
      console.log('userCart', userCart);
      console.log('cartState', cartState);

      if (userCart && userCart._id !== fetchedCartId) {
        dispatch(fetchCartAsync(userCart._id));
        setActiveUserCart(userCart._id);
        setFetchedCartId(userCart._id);
      }

      // If there are items in the local cart state, push those items to the server cart
      if (cartState.cart && cartState.cart.length > 0) {
        dispatch(pushToServerCartAsync({ userId, cart: cartState.cart }));
      }
    }
  }, [
    dispatch,
    userId,
    cartState.allCarts,
    cartState.cart,
    fetchedCartId,
    activeUserCartId,
    setActiveUserCart,
  ]);

  const handleModifyItemInCart = async (event, product, operation) => {
    const quantityChange = parseInt(event.target.value);
    if (isNaN(quantityChange)) {
      return;
    }

    try {
      if (operation === 'add') {
        await dispatch(
          changeCardQuantity({
            id: product.key,
            quantityChange: quantityChange,
          })
        );
      } else if (operation === 'remove') {
        await dispatch(removeCardFromCartAsync({ id: activeUserCartId }));
      }
    } catch (error) {
      console.error('Failed to adjust quantity in cart: ', error);
    }
  };

  const calculateTotalPrice = useCallback(
    () =>
      cartData.reduce(
        (total, item) =>
          total +
          (item.product_prices &&
          item.product_prices.length > 0 &&
          item.product_prices[0].tcgplayer_price
            ? item.product_prices[0].tcgplayer_price
            : 0) *
            item.quantity,
        0
      ),
    [cartData]
  );

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
                  onQuantityChange={handleModifyItemInCart}
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
