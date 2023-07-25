// Cards.test.js

import React from 'react';
import { render } from '@testing-library/react';
import Cards from './Card';
import ProductCard from './ProductCard';

describe('Cards Component', () => {
  // You can write test cases for the Cards component here
  // ...

  it('renders without crashing', () => {
    render(<Cards />);
  });
});

describe('ProductCard Component', () => {
  // You can write test cases for the ProductCard component here
  // ...

  it('renders without crashing', () => {
    render(<ProductCard />);
  });
});
