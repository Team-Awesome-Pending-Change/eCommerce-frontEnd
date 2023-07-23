// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import categoriesSlice from './categories/index';
import cartSlice from './cart/index';
import productSlice from './products/index';
import cardsSlice from './cards/cards';

// Combining all the slices into a rootReducer
const rootReducer = combineReducers({
  cards: cardsSlice.reducer,
  categories: categoriesSlice.reducer,
  products: productSlice.reducer,
  cart: cartSlice.reducer,
});

// Creating the store with the combined rootReducer
const store = configureStore({ reducer: rootReducer });

export default store;
