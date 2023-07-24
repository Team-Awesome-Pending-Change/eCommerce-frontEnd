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
        `${process.env.REACT_APP_SERVER}/api/cart/${userId}/addCardToCart`,
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

export const createCartAsync = createAsyncThunk(
  'cart/createCartAsync',
  async (cardInfo, { getState, rejectWithValue }) => {
    console.log('cardInfo: ', cardInfo);
    try {
      const user = cookies.get('userCookie');
      const userId = user.id;

      // Get the current state of the cart from the Redux store
      const cartData = getState().cart.cart;

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cart/${userId}/addCardToCart`,
        { userId: userId, cardInfo: cardInfo, cartData: cartData }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCartAsync',
  async (cart, thunkAPI) => {
    try {
      const user = cookies.get('userCookie');
      const userId = user.id;
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/cart/${userId}`,
        { cart: cart }
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
        console.warn(`Item with id ${id} not found in cart, adding...`);
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    addCardDirectly(state, action) {
      state.cart.push({ ...action.payload, quantity: 0 });
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
        if (action.payload && Array.isArray(action.payload.cart)) {
          state.cart = action.payload.cart.map((item) => item.card);
        } else {
          state.cart = [];
        }
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
        if (action.payload && Array.isArray(action.payload.cart)) {
          state.cart = action.payload.cart.map((item) => item.card);
        } else {
          state.cart = [];
        }
      })
      .addCase(removeCardFromCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && Array.isArray(action.payload.cart)) {
          state.cart = action.payload.cart.map((item) => item.card);
        } else {
          state.cart = [];
        }
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the `allCarts` array with the newly created cart
        if (action.payload) {
          state.allCarts.push(action.payload);
        }
      })
      .addCase(createCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleCartVisibility, changeCardQuantity, addCardDirectly } =
  cartSlice.actions;

export default cartSlice;
