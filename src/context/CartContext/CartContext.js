/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'; // import useCookies

import { useCardStore } from './CardStore'; // import the useCardStore hook

export const CartContext = createContext({
  items: [],
  getCardQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  setItems: () => {}, // Add setItems to the context
});

export const CartProvider = ({ children }) => {
  const [cartCards, setCartCards] = useState([]);
  const { getCardData } = useCardStore();

  const [cookies, setCookie] = useCookies(['userCookie', 'cart']); // using the useCookies hook
  console.log('Cookies:', cookies); // Log the cookies object
  console.log('Cookies.userCookie:', cookies.userCookie); // Log the userCookie value (should be undefined
  console.log('Cookies.userCookie.id:', cookies.userCookie?.id); // Log the userCookie id (should be undefined)
  const userId = cookies.userCookie?.id; // get the userId from the cookie

  // Fetch the user's cart data when the component is mounted
  // Fetch the user's cart data when the component is mounted
  useEffect(() => {
    const fetchUserCart = async (userId) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/api/carts/userCart/${userId}`
        );

        if (!response.ok) {
          // If status is 404 (Not Found), try creating a new cart
          if (response.status === 404) {
            const newCartResponse = await fetch(
              `${process.env.REACT_APP_SERVER}/api/carts/newCart/${userId}`,
              {
                method: 'POST', // Assuming your API uses a POST request to create a new cart
              }
            );

            if (!newCartResponse.ok) {
              throw new Error(`HTTP error! status: ${newCartResponse.status}`);
            }

            const newCartData = await newCartResponse.json();
            setCookie('cart', Array.isArray(newCartData) ? newCartData : [], {
              path: '/cart',
            });
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          setCookie('cart', Array.isArray(data) ? data : [], { path: '/' });
        }
      } catch (error) {
        console.error(`Failed to fetch user cart data: ${error.message}`);
      }
    };

    if (userId) {
      fetchUserCart(userId);
    }
  }, [userId, setCookie]);

  // Update the state from the cookie every time the cookie changes
  useEffect(() => {
    setCartCards(cookies.cart || []);
  }, [cookies.cart]);

  const getCardQuantity = (id) => {
    if (!Array.isArray(cartCards)) {
      return 0;
    }

    return cartCards.find((card) => card.id === id)?.quantity || 0;
  };

  const addOneToCart = (id) => {
    const quantity = getCardQuantity(id);
    setCartCards((prevCartCards) =>
      Array.isArray(prevCartCards)
        ? quantity === 0
          ? [...prevCartCards, { id, quantity: 1 }]
          : prevCartCards.map((card) =>
              card.id === id ? { ...card, quantity: card.quantity + 1 } : card
            )
        : []
    );
  };

  const removeOneFromCart = (id) => {
    const quantity = getCardQuantity(id);
    setCartCards((prevCartCards) =>
      Array.isArray(prevCartCards)
        ? quantity === 1
          ? prevCartCards.filter((currentCard) => currentCard.id !== id)
          : prevCartCards.map((card) =>
              card.id === id ? { ...card, quantity: card.quantity - 1 } : card
            )
        : []
    );
  };

  const deleteFromCart = (id) => {
    setCartCards((prevCartCards) =>
      Array.isArray(prevCartCards)
        ? prevCartCards.filter((currentCard) => currentCard.id !== id)
        : []
    );
  };

  const getTotalCost = () => {
    return cartCards.reduce((totalCost, cartItem) => {
      const cardData = getCardData(cartItem.id);
      return totalCost + cardData.price * cartItem.quantity;
    }, 0);
  };

  const setItems = (items) => {
    setCartCards(Array.isArray(items) ? items : []);
  };

  const contextValue = {
    items: cartCards,
    getCardQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    setItems, // Add setItems to the context value
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
