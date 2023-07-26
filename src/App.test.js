import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders header, footer, and home page by default', () => {
  const container = document.createElement('div');
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
    container
  );

  const headerElement = container.querySelector('[data-testid="header"]');
  const footerElement = container.querySelector('[data-testid="footer"]');
  expect(headerElement).toBeInTheDocument();
  expect(footerElement).toBeInTheDocument();

  const homePageElement = container.querySelector('[data-testid="home-page"]');
  expect(homePageElement).toBeInTheDocument();
});

test('renders store page when "/store" route is accessed', () => {
  const container = document.createElement('div');
  render(
    <MemoryRouter initialEntries={['/store']}>
      <App />
    </MemoryRouter>,
    container
  );

  const storePageElement = container.querySelector('[data-testid="store-page"]');
  expect(storePageElement).toBeInTheDocument();
});

test('renders cart page when "/cart" route is accessed', () => {
  const container = document.createElement('div');
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <App />
    </MemoryRouter>,
    container
  );

  const cartPageElement = container.querySelector('[data-testid="cart-page"]');
  expect(cartPageElement).toBeInTheDocument();
});
