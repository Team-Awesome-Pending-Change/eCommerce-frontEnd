// cardSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCardsAction,
  getCardByNameAction,
  // other actions...
} from './cardActions';

const cardSlice = createSlice({
  name: 'cards',
  initialState: { cards: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCardsAction.fulfilled, (state, action) => {
      state.cards = action.payload;
      state.status = 'succeeded';
    });
    // other cases...
  },
});

export default cardSlice;
