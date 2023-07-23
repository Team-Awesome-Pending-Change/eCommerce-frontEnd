import React from 'react';

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);
  const [allCarts, setAllCarts] = React.useState([]); // add allCarts state
  const value = { cart, setCart, allCarts, setAllCarts };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
