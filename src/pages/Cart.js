import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartAsync, fetchAllCartsAsync } from '../store/cart';
import './CartPage.css'; // import css file
import { CartContext } from '../context/CartContext/CartContext';
import { Cookies } from 'react-cookie';

// Create instance of Cookies
const cookies = new Cookies();

const user = cookies.get('userCookie'); // Use the instance to get the cookie
const userId = user.id;

const CartPage = () => {
  const isCartVisible = useSelector((state) => state.cart.cartVisible);
  const { cart: cartItems, setAllCarts } = useContext(CartContext);
  const allCarts = useSelector((state) => state.cart.allCarts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCartsAsync());
  }, [dispatch]);

  useEffect(() => {
    setAllCarts(allCarts);
  }, [allCarts, setAllCarts]);

  useEffect(() => {
    const userCart = allCarts.find((cart) => cart.userId === userId);
    if (userCart) {
      dispatch(fetchCartAsync(userCart.id));
    }
  }, [dispatch, allCarts, userId]);

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.totalPrice, 0);

  // Only render if cart is visible
  if (!isCartVisible) return null;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-detail">
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total Price: ${item.totalPrice}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
      {cartItems.length > 0 && (
        <p className="total-price">Grand Total: ${calculateTotalPrice()}</p>
      )}
    </div>
  );
};

export default CartPage;
