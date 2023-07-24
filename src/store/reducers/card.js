import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions
export const getAllCards = createAsyncThunk('cards/getAllCards', async () => {
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
export const loadCardsFromAPI = createAsyncThunk(
  'cards/loadCardsFromAPI',
  async () => {
    const response = await axios.get('http://localhost:3001/api/cards');
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  }
);

// Asynchronously adjust card stock on server-side database when adding to cart
export const adjustStockOnAddingToCart = createAsyncThunk(
  'cards/adjustStockOnAddingToCart',
  async (cardId) => {
    const response = await axios.get(
      `http://localhost:3001/api/cards/${cardId}`
    );
    const cardDetails = response.data;

    if (cardDetails.inStock <= 0) {
      throw new Error('This card is out of stock');
    } else {
      const updatedDetails = { inStock: cardDetails.inStock - 1 };
      await axios.put(
        `http://localhost:3001/api/cards/${cardId}`,
        updatedDetails
      );
    }
  }
);

// Asynchronously add a new card to the server-side database
export const addCardToDatabase = createAsyncThunk(
  'cards/addCardToDatabase',
  async (cardData) => {
    const response = await axios.post(
      'http://localhost:3001/api/cards',
      cardData
    );
    return response.data;
  }
);

// Asynchronously delete card from server-side database
export const deleteCardFromDatabase = createAsyncThunk(
  'cards/deleteCardFromDatabase',
  async (cardId) => {
    const response = await axios.delete(
      `http://localhost:3001/api/cards/${cardId}`
    );
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  }
);

// Slice
const cardSlice = createSlice({
  name: 'cards',
  initialState: { cards: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCardsFromAPI.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.status = 'succeeded';
      })
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
      })
      .addCase(adjustStockOnAddingToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addCardToDatabase.fulfilled, (state, action) => {
        state.cards = [...state.cards, action.payload];
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
