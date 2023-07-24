// cardActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCards, getCardByName /* other methods... */ } from './api';

export const getAllCardsAction = createAsyncThunk(
  'cards/getAllCards',
  getAllCards
);

export const getCardByNameAction = createAsyncThunk(
  'cards/getCardByName',
  getCardByName
);

// similarly define other actions...

// export all actions...
