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
      console.log('response.data: ', response.data);
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
      console.log('response.data: ', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// Redux
export const addItemToCartAsync = createAsyncThunk(
  'cart/addItemToCartAsync',
  async (cardInfo, thunkAPI) => {
    try {
      const user = cookies.get('userCookie'); // Use the instance to get the cookie
      const userId = user.id;
      // console.log('userId: ', userId);
      // console.log('cardInfo: ', cardInfo);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cart/${userId}/addToCart`,
        { cardInfo: cardInfo, userId: userId } // changed this line
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// export const addItemToCartAsync = createAsyncThunk(
//   'cart/addItemToCartAsync',
//   async (cardInfo, thunkAPI) => {
//     try {
//       const user = cookies.get('userCookie'); // Use the instance to get the cookie
//       const userId = user.id;
//       console.log('userId: ', userId);
//       const response = await axios.post(
//         `${process.env.REACT_APP_SERVER}/api/cart/addToCart`,
//         { userId, cardInfo }
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response);
//     }
//   }
// );

export const removeItemFromCartAsync = createAsyncThunk(
  'cart/removeItemFromCartAsync',
  async (cardId, thunkAPI) => {
    try {
      const user = cookies.get('userCookie'); // Use the instance to get the cookie
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCartsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCartsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming the backend returns an array of all carts
        state.allCarts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllCartsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // handle error message
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
        state.error = action.error.message; // handle error message
      })
      .addCase(addItemToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming the backend returns the added item, append it to the cart array
        if (action.payload) {
          state.cart.push(action.payload);
        }
      })
      .addCase(addItemToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // handle error message
      })
      .addCase(removeItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = Array.isArray(action.payload.cart)
          ? action.payload.cart
          : [];
      })
      .addCase(removeItemFromCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // handle error message
      });
  },
});

export const { toggleCartVisibility } = cartSlice.actions;

export default cartSlice;
