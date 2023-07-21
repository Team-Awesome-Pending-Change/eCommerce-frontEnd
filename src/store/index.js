import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cards';
import cartReducer from './cart';

const store = () => configureStore({ 
    reducer: {
      //bring card reducer after creation into here
      cards: cardReducer,
      cart: cartReducer
    }
});

export default store;