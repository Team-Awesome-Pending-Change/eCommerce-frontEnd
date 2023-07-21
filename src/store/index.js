import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cards';
import cartReducer from './cart';

const store = () => configureStore({ 
    reducer: {
      cards: cardReducer,
      cart: cartReducer
    }
});

export default store();