import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
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
// import { useCardStore } from '../context/CartContext/CardStore';

const CartPage = () => {
  const [cookies] = useCookies(['userCookie']);
  const user = cookies.userCookie;
  const userId = user?.id;

  const {
    cartData, // Use the updated cart object from the context
    getCardQuantity,
    addOneToCart,
    removeOneFromCart,
    getTotalCost,
    loading,
    error,
  } = useContext(CartContext);

  // const { getCardData } = useContext(useCardStore()); // Using useCardStore here instead of CartContext
  // const { getRandomCard } = useCardStore();
  // const randomCard = getRandomCard();
  // console.log('randomCard', randomCard);
  console.log('cartData', cartData);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(!(userId && cartData.cart && cartData.cart.length > 0));
  }, [cartData, userId]);

  if (pageLoading || loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <BeatLoader color={'#123abc'} loading={true} size={24} />
      </div>
    );
  }

  const calculateTotalPrice = getTotalCost();

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

  if (error) {
    return <div>Error: {error}</div>;
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
                {cartData.cart ? (
                  <CartContent
                    // cartData={cartData.cart.map((item) => ({
                    //   ...getCardData(item.id),
                    //   quantity: getCardQuantity(item.id),
                    // }))}
                    cartData={cartData.cart}
                    calculateTotalPrice={calculateTotalPrice}
                    onQuantityChange={handleModifyItemInCart}
                  />
                ) : (
                  <div>Loading cart data...</div>
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
