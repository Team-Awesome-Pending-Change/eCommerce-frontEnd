// CartContent.jsx

import React from 'react';
import {
  Box,
  Card as CardElement,
  CardContent,
  Typography,
} from '@mui/material';
import ProductCard from '../components/cards/ProductCard';

const CartContent = ({ cartData, calculateTotalPrice }) => (
  <Box sx={{ width: '100%', flexGrow: '1' }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
      Your Cart
    </Typography>
    {cartData.length > 0 ? (
      cartData.map((card) => (
        <Box key={card.id} sx={{ marginBottom: '1rem', flexGrow: '1' }}>
          {/* <CardElement sx={{ padding: '1rem' }}> */}
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <ProductCard key={card.id} card={card} />
            {/* <Typography variant="body1">{card.name}</Typography>
              <Typography variant="body1">Quantity: {card.quantity}</Typography>
              <Typography variant="body1">
                Total Price: ${card.totalPrice}
              </Typography> */}
          </CardContent>
          {/* </CardElement> */}
        </Box>
      ))
    ) : (
      <Typography variant="h6">Your cart is empty.</Typography>
    )}
  </Box>
);

export default CartContent;
