import React from 'react';

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);
  const [allCarts, setAllCarts] = React.useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const value = {
    cart,
    setCart,
    allCarts,
    setAllCarts,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
