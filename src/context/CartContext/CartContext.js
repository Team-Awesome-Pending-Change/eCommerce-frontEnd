/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useCardStore } from './CardStore';

export const CartContext = createContext({
  cartData: {
    _id: '',
    cart: [],
  },
  getCardQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  setCart: () => {},
  fetchUserCart: () => {},
  createUserCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({
    _id: '', // Cart id
    cart: [], // Cart items
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getCardData } = useCardStore();
  const [cookies, setCookie] = useCookies(['userCookie', 'cart']);

  const userId = cookies.userCookie?.id;

  const createUserCart = async (userId) => {
    const newCartResponse = await fetch(
      `${process.env.REACT_APP_SERVER}/api/carts/newCart/${userId}`,
      {
        method: 'POST',
      }
    );

    if (!newCartResponse.ok) {
      throw new Error(`HTTP error! status: ${newCartResponse.status}`);
    }

    const newCartData = await newCartResponse.json();
    console.log('CART CREATED:', newCartData);
    const newCartItems = Array.isArray(newCartData.cart)
      ? newCartData.cart
      : [];
    setCookie('cart', newCartItems, { path: '/' });
    return newCartItems;
  };

  const fetchUserCart = useCallback(
    async (userId) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/api/carts/userCart/${userId}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            return createUserCart(userId);
          } else if (response.status === 500) {
            setError('An unexpected error occurred. Please try again later.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          console.log('CART EXISTS:', data);
          setCookie('cart', Array.isArray(data.cart) ? data.cart : [], {
            path: '/',
          });
          setLoading(false);
          return data;
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    },
    [setCookie]
  );

  useEffect(() => {
    if (userId && typeof userId === 'string') {
      fetchUserCart(userId).then((data) => {
        if (data && data.cart) {
          // setCartData(data);
          setCartDataAndCookie(data);
        } else {
          console.error('Cart data was not retrieved for user', userId);
        }
      });
    }
  }, [userId, fetchUserCart]);

  const setCartDataAndCookie = (newCartData) => {
    setCartData(newCartData);
    setCookie('cart', newCartData.cart, { path: '/' });
  };

  const updateCartInBackend = async (cartId, updatedCart) => {
    const formattedCartData = updatedCart.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      frameType: item.frameType,
      desc: item.desc,
      atk: item.atk,
      def: item.def,
      level: item.level,
      race: item.race,
      attribute: item.attribute,
      card_images: item.card_images,
      card_prices: item.card_prices,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/carts/${cartId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedCartData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('data:', data);
      return data;
    } catch (error) {
      console.error(`Failed to update cart in backend: ${error.message}`);
    }
  };

  const getCardQuantity = (cardInfo) => {
    const cartItem = cartData.cart?.find((item) => item.id === cardInfo.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const addOneToCart = async (cardInfo) => {
    console.log('cartData at addOneToCart:', cartData);
    console.log('cartData._id at addOneToCart:', cartData?._id);

    if (!cartData?._id) {
      // Checking for cartData._id instead of cartData.cart._id
      console.log('A valid cart has not been fetched from the backend yet.');
      return;
    }

    const itemExistsInCart = cartData.cart.some(
      (item) => item.id === cardInfo.id
    );

    let updatedCart;
    if (itemExistsInCart) {
      updatedCart = cartData.cart.map((item) => {
        if (item.id === cardInfo.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      updatedCart = [...cartData.cart, { ...cardInfo, quantity: 1 }];
    }

    const newCartData = await updateCartInBackend(cartData._id, updatedCart);
    // setCartData(newCartData || []);
    setCartDataAndCookie(newCartData || []);
  };

  const removeOneFromCart = async (cardInfo) => {
    const quantity = getCardQuantity(cardInfo);

    if (quantity === 1) {
      await deleteFromCart(cardInfo);
    } else {
      const updatedCart =
        cartData?.cart?.map((item) => {
          if (item.id === cardInfo.id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        }) ?? [];

      const newCartData = await updateCartInBackend(cartData?._id, updatedCart);
      // setCartData(newCartData || []);
      setCartDataAndCookie(newCartData || []);
    }
  };

  const deleteFromCart = async (cardInfo) => {
    const updatedCart =
      cartData?.cart?.filter((item) => item.id !== cardInfo.id) ?? [];
    const newCartData = await updateCartInBackend(cartData?._id, updatedCart);
    // setCartData(newCartData || []);
    setCartDataAndCookie(newCartData || []);
  };

  const getTotalCost = () => {
    return cartData?.cart?.reduce((total, item) => {
      return total + item.quantity * item.cost;
    }, 0);
  };

  const setCart = (newCart) => {
    setCartData(newCart);
    setCookie('cart', newCart, { path: '/' });
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        getCardQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        setCartData, // Updated here
        fetchUserCart,
        createUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
