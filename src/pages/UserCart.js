import { useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext/CartContext';

const UserCart = ({ userId }) => {
  const cart = useContext(CartContext);

  const getAllCartsAndFindUserCart = async (userId) => {
    /* ... your implementation */
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await getAllCartsAndFindUserCart(userId);
      cart.setItems(cartData); // Set cart items with fetched data
    };

    fetchCartData();
  }, [userId]); // Add userId as a dependency

  return null; // return null as this component doesn't render anything
};

export default UserCart;
