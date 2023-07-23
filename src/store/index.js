// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import cartSlice from './cart/index';
import cardSlice from './cards/index';

import productSlice from './products/index';
import categoriesSlice from './categories/index';

// Combining all the slices into a rootReducer
const rootReducer = combineReducers({
  cards: cardSlice.reducer,
  categories: categoriesSlice.reducer,
  products: productSlice.reducer,
  cart: cartSlice.reducer,
});

// Creating the store with the combined rootReducer
const store = configureStore({ reducer: rootReducer });

export default store;
