import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActions as cartActions } from '../store/reducers/cart';

const CartManagement = ({ userId, cartId, cartData, filteredCards }) => {
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(
    (card, index) => {
      dispatch(
        cartActions.addToCart({
          userId,
          cartId,
          card,
          index,
          cartData,
          filteredCards,
        })
      );
    },
    [dispatch, userId, cartData, filteredCards, cartId]
  );

  const handleRemoveCardFromCart = useCallback(
    (card) => {
      dispatch(
        cartActions.removeFromCart({
          userId,
          cartId,
          card,
          cartData,
          filteredCards,
        })
      );
    },
    [dispatch, userId, cartData, filteredCards, cartId]
  );

  return { handleAddToCart, handleRemoveCardFromCart };
};

export default CartManagement;
