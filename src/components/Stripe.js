// src/components/Stripe.js
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Stripe = () => {
  const onToken = (token) => {
    console.log(token); // You can customize the token handling logic here
  };

  return (
    <StripeCheckout
      token={onToken}
      stripeKey="pk_test_51NW4c5BPPQzpp0D4DtIPxh2LRdTkDxkKjd03TZRyZJgEh8N1OpfK1A9RiiL4cfSZ8BrtWqvquz4nX5sKhzLmDoGM00ZXQGbYcJ"
    />
  );
};

export default Stripe;
