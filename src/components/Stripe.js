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
      stripeKey={process.env.REACT_APP_STRIPE_KEY} // Use the process.env variable
    />
  );
};

export default Stripe;