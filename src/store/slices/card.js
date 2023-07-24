import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = 'http://localhost:3001/api/cards';

// Define a helper function to create a request
const createRequest = async (method, path, data = null) => {
  const response = await axios({ method, url: `${apiUrl}${path}`, data });
  if (response.status !== 200)
    throw new Error(`HTTP error! status: ${response.status}`);
  return response.data;
};

const createCardThunk = (type, method, path = '', data = null) =>
  createAsyncThunk(`cards/${type}`, (value) =>
    createRequest(
      method,
      `${path}${data ? `/${encodeURIComponent(value)}` : ''}`,
      data
    )
  );

export const getAllCards = createCardThunk('getAllCards', 'get');
export const getCardByName = createCardThunk('getCardByName', 'get', '?name');
export const getCardByType = createCardThunk('getCardByType', 'get', '?type');
export const getCardByAttribute = createCardThunk(
  'getCardByAttribute',
  'get',
  '?attribute'
);
export const loadCardsFromAPI = createCardThunk('loadCardsFromAPI', 'get');
export const addCardToDatabase = createCardThunk(
  'addCardToDatabase',
  'post',
  '',
  { id: Math.random() }
); // example data
export const deleteCardFromDatabase = createCardThunk(
  'deleteCardFromDatabase',
  'delete'
);
export const adjustStockOnAddingToCart = createAsyncThunk(
  'cards/adjustStockOnAddingToCart',
  async (cardId) => {
    const cardDetails = await createRequest('get', `/${cardId}`);
    if (cardDetails.inStock <= 0) throw new Error('This card is out of stock');
    return createRequest('put', `/${cardId}`, {
      inStock: cardDetails.inStock - 1,
    });
  }
);

const fulfilledActions = [
  loadCardsFromAPI.fulfilled,
  getAllCards.fulfilled,
  getCardByName.fulfilled,
  getCardByType.fulfilled,
  getCardByAttribute.fulfilled,
  addCardToDatabase.fulfilled,
];

const cardSlice = createSlice({
  name: 'cards',
  initialState: { cards: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => fulfilledActions.includes(action.type),
        (state, action) => {
          state.cards =
            action.type === addCardToDatabase.fulfilled.type
              ? [...state.cards, action.payload]
              : action.payload;
          state.status = 'succeeded';
        }
      )
      .addCase(adjustStockOnAddingToCart.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteCardFromDatabase.fulfilled, (state, action) => {
        state.cards = state.cards.filter(
          (card) => card.id !== action.payload.id
        );
        state.status = 'succeeded';
      });
  },
});

export default cardSlice;
