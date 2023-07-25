import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions
export const getAllCards = createAsyncThunk('cards/getAllCards', async () => {
  console.log('Getting all cards');
  const response = await axios.get('http://localhost:3001/api/cards');
  return response.data;
});

export const getCardByName = createAsyncThunk(
  'cards/getCardByName',
  async (name) => {
    const response = await axios.get(
      `http://localhost:3001/api/cards?name=${name}`
    );
    return response.data;
  }
);

export const getCardByType = createAsyncThunk(
  'cards/getCardByType',
  async (type) => {
    const response = await axios.get(
      `http://localhost:3001/api/cards?type=${type}`
    );
    return response.data;
  }
);

export const getCardByAttribute = createAsyncThunk(
  'cards/getCardByAttribute',
  async (attribute) => {
    const response = await axios.get(
      `http://localhost:3001/api/cards?attribute=${attribute}`
    );
    return response.data;
  }
);

// Asynchronously load cards from server-side API
export const loadCardsFromAPI = () => async (dispatch) => {
  try {
    // Fetch all cards from the server
    const apiResponse = await fetch('http://localhost:3001/api/cards');

    // Error handling for unsuccessful fetch
    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    // Parse the JSON response
    const cardData = await apiResponse.json();
    console.log('cardData: ', cardData);
    // Dispatch loadAllProducts action to update Redux store
    dispatch(cardSlice.actions.setCards(cardData));
  } catch (error) {
    console.error('Fetching cards failed: ', error);
  }
};

// Slice
const cardSlice = createSlice({
  name: 'cards',
  initialState: { cards: [], status: 'idle', error: null },
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getCardByName.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getCardByType.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getCardByAttribute.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const { setCards } = cardSlice.actions;
export default cardSlice;
