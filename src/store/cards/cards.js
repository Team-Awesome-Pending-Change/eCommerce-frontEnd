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
      `http://localhost:3001/api/cards?name=${name}`,
    );
    return response.data;
  },
);

export const getCardByType = createAsyncThunk(
  'cards/getCardByType',
  async (type) => {
    const response = await axios.get(
      `http://localhost:3001/api/cards?type=${type}`,
    );
    return response.data;
  },
);

export const getCardByAttribute = createAsyncThunk(
  'cards/getCardByAttribute',
  async (attribute) => {
    const response = await axios.get(
      `http://localhost:3001/api/cards?attribute=${attribute}`,
    );
    return response.data;
  },
);

// Slice
const cardSlice = createSlice({
  name: 'cards',
  initialState: [],
  reducers: {
    addCard: (state, action) => {
      state.push(action.payload);
    },
    setCards: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCards.fulfilled, (state, action) => {
        state.push(...action.payload);
      })
      .addCase(getCardByName.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getCardByType.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getCardByAttribute.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { addCard, setCards } = cardSlice.actions;
export default cardSlice;
