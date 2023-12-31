import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from '../cards/ProductCard';

const CartContent = ({ cartData, onQuantityChange, calculateTotalPrice }) => (
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
    {cartData && cartData.length > 0 ? (
      cartData.map((card, index) =>
        card ? (
          <Box
            key={card.id + index}
            sx={{ marginBottom: '1rem', flexGrow: '1' }}
          >
            <ProductCard
              card={card}
              onQuantityChange={(operation) => {
                onQuantityChange(card.id, operation);
                calculateTotalPrice();
              }}
            />
          </Box>
        ) : null
      )
    ) : (
      <Typography variant="h6" sx={{ color: '#666' }}>
        Your cart is empty.
      </Typography>
    )}
    {cartData && cartData.length > 0 && (
      <Typography variant="h5" sx={{ color: '#333', marginTop: '1rem' }}>
        Total: ${calculateTotalPrice()}
      </Typography>
    )}
  </Box>
);

export default CartContent;
