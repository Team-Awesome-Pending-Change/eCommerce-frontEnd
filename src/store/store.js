import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './reducers/card';
import { customMiddleware } from './middleware';
import cartSlice from './cart';

const rootReducer = {
  cards: cardSlice.reducer,
  cart: cartSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'cart/addItemToCartAsync/rejected',
          'cart/addCardToCartAsync/rejected', // Add this line
        ],
      },
    }).concat(customMiddleware), // add your custom middleware here
});

export default store;
