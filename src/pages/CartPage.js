import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Cookies } from 'react-cookie';
import {
  Box,
  Card as CardElement,
  CardContent,
  Container,
} from '@mui/material';
import CartContent from '../components/content/CartContent';
import CustomerForm from '../components/forms/CustomerForm';
import { CartContext } from '../context/CartContext/CartContext';
import { BeatLoader } from 'react-spinners';
import { useCardStore } from '../context/CartContext/CardStore';

const CartPage = () => {
  const cookies = new Cookies();
  const user = cookies.get('userCookie');
  const userId = user?.id;
  console.log('User id:', userId); // Log the user id

  const {
    items,
    getCardQuantity,
    addOneToCart,
    removeOneFromCart,
    getTotalCost,
    setItems,
  } = useContext(CartContext);

  const { getCardData } = useCardStore(); // Use the useCardStore hook to get the getCardData function

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When the user id or the cart items change, update the loading state
    setLoading(!(userId && items && items.length > 0));
  }, [items, userId]);

  const calculateTotalPrice = useCallback(getTotalCost, [items]);

  const handleModifyItemInCart = async (cardId, operation) => {
    try {
      if (operation === 'add') {
        addOneToCart(cardId);
      } else if (operation === 'remove') {
        removeOneFromCart(cardId);
      }
    } catch (error) {
      console.error('Failed to adjust quantity in cart: ', error);
    }
  };

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
                {items && (
                  <CartContent
                    cartData={items.map((item) => ({
                      ...getCardData(item.id),
                      quantity: getCardQuantity(item.id),
                    }))}
                    calculateTotalPrice={calculateTotalPrice}
                    onQuantityChange={handleModifyItemInCart}
                  />
                )}
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
