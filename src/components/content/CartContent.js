import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from '../cards/ProductCard';

const CartContent = ({ cartData, onQuantityChange }) => (
  <Box sx={{ width: '100%', flexGrow: '1' }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
      Your Cart
    </Typography>
    {cartData.length > 0 ? (
      cartData.map((card, index) => (
        <Box key={card.id + index} sx={{ marginBottom: '1rem', flexGrow: '1' }}>
          <ProductCard card={card} onQuantityChange={onQuantityChange} />
        </Box>
      ))
    ) : (
      <Typography variant="h6">Your cart is empty.</Typography>
    )}
  </Box>
);

export default CartContent;
