import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from '../cards/ProductCard';
// import { useCardStore } from '../context/CardStore';
import { useCardStore } from '../../context/CartContext/CardStore';
import { CartContext } from '../../context/CartContext/CartContext';

const CartContent = ({ onQuantityChange, calculateTotalPrice }) => {
  const { cardsArray } = useCardStore();
  const {
    cartData, // Use the updated cart object from the context
    getCardQuantity,
    addOneToCart,
    removeOneFromCart,
    getTotalCost,
    loading,
    error,
  } = useContext(CartContext);
  console.log('cartData', cartData);

  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: '1',
        backgroundColor: '#f8f8f8',
        borderRadius: '5px',
        padding: '1rem',
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}
      >
        Your Cart
      </Typography>
      {cartData.cart && cartData.cart.length > 0 ? (
        cartData.cart.map((card, index) =>
          card ? (
            <Box
              key={card.id + index}
              sx={{ marginBottom: '1rem', flexGrow: '1' }}
            >
              <ProductCard
                cardInfo={card}
                cardQuantity={getCardQuantity(card.id)}
              />
            </Box>
          ) : null
        )
      ) : (
        <Typography variant="h6" sx={{ color: '#666' }}>
          Your cart is empty.
        </Typography>
      )}
      {cartData.cart && cartData.cart.length > 0 && (
        <Typography variant="h5" sx={{ color: '#333', marginTop: '1rem' }}>
          Total: ${getTotalCost()}
        </Typography>
      )}
    </Box>
  );
};

export default CartContent;
