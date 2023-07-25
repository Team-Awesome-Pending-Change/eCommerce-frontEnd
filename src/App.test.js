import { render, screen } from '@testing-library/react';
import App from './App';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders header, footer, and home page by default', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );


  const headerElement = screen.getByTestId('header');
  const footerElement = screen.getByTestId('footer');
  expect(headerElement).toBeInTheDocument();
  expect(footerElement).toBeInTheDocument();

  const homePageElement = screen.getByTestId('home-page');
  expect(homePageElement).toBeInTheDocument();

});

test('renders store page when "/store" route is accessed', () => {
  render(
    <MemoryRouter initialEntries={['/store']}>
      <App />
    </MemoryRouter>
  );

  // Check if the store page is rendered when "/store" route is accessed
  const storePageElement = screen.getByTestId('store-page');
  expect(storePageElement).toBeInTheDocument();

  // Additional checks for specific elements on the store page can be added if needed
});

test('renders cart page when "/cart" route is accessed', () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <App />
    </MemoryRouter>
  );

  // Check if the cart page is rendered when "/cart" route is accessed
  const cartPageElement = screen.getByTestId('cart-page');
  expect(cartPageElement).toBeInTheDocument();

  // Additional checks for specific elements on the cart page can be added if needed
});
