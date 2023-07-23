import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cookies } from 'react-cookie';

// Create instance of Cookies
const cookies = new Cookies();

const initialState = {
  cart: [],
  allCarts: [],
  cartVisible: false,
  status: 'idle',
  error: null,
};

export const fetchAllCartsAsync = createAsyncThunk(
  'cart/fetchAllCartsAsync',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/cart`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCartAsync',
  async (cartId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/cart/${cartId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const addCardToCartAsync = createAsyncThunk(
  'cart/addItemToCartAsync',
  async (cardInfo, thunkAPI) => {
    try {
      const user = cookies.get('userCookie');
      const userId = user.id;
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cart/${userId}/addToCart`,
        { cardInfo: cardInfo, userId: userId }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const removeCardFromCartAsync = createAsyncThunk(
  'cart/removeItemFromCartAsync',
  async (cardId, thunkAPI) => {
    try {
      const user = cookies.get('userCookie');
      const userId = user.id;
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/cart/${userId}/${cardId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartVisibility(state) {
      state.cartVisible = !state.cartVisible;
    },
    changeCardQuantity(state, action) {
      const { id, quantityChange } = action.payload;
      let currentItems = [...state.cart];
      let targetItem = currentItems.find((item) => item.key === id);

      if (targetItem) {
        targetItem.quantity += quantityChange;
        if (targetItem.quantity === 0) {
          currentItems = state.cart.filter((item) => item.key !== id);
        }
        state.cart = currentItems;
      } else {
        console.warn(`Item with id ${id} not found in cart`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCartsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCartsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allCarts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllCartsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = Array.isArray(action.payload.cart)
          ? action.payload.cart
          : [];
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCardToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCardToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.cart.push(action.payload);
        }
      })
      .addCase(addCardToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeCardFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCardFromCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = Array.isArray(action.payload.cart)
          ? action.payload.cart
          : [];
      })
      .addCase(removeCardFromCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleCartVisibility, changeCardQuantity } = cartSlice.actions;

export default cartSlice;
