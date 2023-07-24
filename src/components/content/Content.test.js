// Content.test.js

import React from 'react';
import { render } from '@testing-library/react';
import CartContent from './CartContent';

const mockCartData = [
  {
    id: 1,
    title: 'Product 1',
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20.0,
    quantity: 1,
  },
];

test('renders cart content with products', () => {
  const onQuantityChange = jest.fn(); // Mock the onQuantityChange function
  const { getByText } = render(<CartContent cartData={mockCartData} onQuantityChange={onQuantityChange} />);

  expect(getByText('Your Cart')).toBeInTheDocument();
  expect(getByText('Product 1')).toBeInTheDocument();
  expect(getByText('Product 2')).toBeInTheDocument();
});

test('renders empty cart message', () => {
  const onQuantityChange = jest.fn(); // Mock the onQuantityChange function
  const { getByText } = render(<CartContent cartData={[]} onQuantityChange={onQuantityChange} />);

  expect(getByText('Your cart is empty.')).toBeInTheDocument();
});
