import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const server = process.env.REACT_APP_SERVER;
const initialState = {
  cart: [],
  allCarts: [],
  totalAmount: 0,
  cartVisible: false,
  status: 'idle',
  error: null,
};

const axiosGet = async (path, { userId, id }, thunkAPI) => {
  // add id parameter
  try {
    path = path.replace(':userId', userId).replace(':id', id); // replace placeholders with IDs
    const response = await axios.get(`${server}${path}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
};

// update axiosSend function to pass correct data for handleAddToCart action
const axiosSend = async (method, path, { userId, ...data }, thunkAPI) => {
  try {
    const user = cookies.get('userCookie');
    console.log('userCookie: ', user);
    const pathWithIds = path.replace(':userId', userId).replace(':id', data.id); // replace placeholders with IDs
    let requestData = data;

    // if the request is for handleAddToCart, structure the data as expected by the server route
    if (path.includes('addCardToCart')) {
      requestData = { cardId: data.cardId, cartId: data.cartId };
    }

    const response = await axios[method](
      `${server}${pathWithIds}`,
      requestData
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
};
const asyncActions = [
  { name: 'fetchAllCarts', url: '/api/cart', method: 'get' },
  {
    name: 'fetchCart',
    url: '/api/cart/:id/getCart', // use placeholder here
    method: 'get',
  },
  {
    name: 'handleAddToCart',
    url: '/api/cart/:userId', // update placeholder to match server route
    method: 'post',
  },
  {
    name: 'removeCardFromCart',
    url: '/api/cart/:userId/items/:id',
    method: 'delete',
  },
  { name: 'updateCart', url: '/api/cart', method: 'put' },
  { name: 'createCart', url: '/api/cart', method: 'post' },
  {
    name: 'addCardDirectlyAndUpdate',
    url: '/api/cart',
    method: 'put',
  },
];

const asyncThunks = asyncActions.reduce((acc, action) => {
  const thunk = createAsyncThunk(
    `cart/${action.name}Async`,
    action.method === 'get'
      ? (args, thunkAPI) => axiosGet(action.url, args, thunkAPI)
      : (args, thunkAPI) => axiosSend(action.method, action.url, args, thunkAPI)
  );

  return { ...acc, [action.name]: thunk };
}, {});

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
    removeCardFromCart(state, action) {
      const { id } = action.payload;
      let currentItems = [...state.cart];
      state.cart = currentItems.filter((item) => item.key !== id);
    },
    addCardDirectly(state, action) {
      console.log('addCardDirectly action: ', action);
      console.log('addCardDirectly state: ', state);
      const card = action.payload;
      const cardInCart = state.cart.find((item) => item.card === card.id);

      if (cardInCart) {
        cardInCart.quantity += 1;
      } else {
        let newCartItem = {
          card: card.id,
          quantity: 1,
        };
        state.cart.push(newCartItem);
      }

      state.totalPrice += card.price;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncThunks.fetchAllCarts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncThunks.fetchAllCarts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allCarts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(asyncThunks.fetchAllCarts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(asyncThunks.fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncThunks.fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && Array.isArray(action.payload.cart)) {
          state.cart = action.payload.cart.map((item) => item.card);
        } else {
          state.cart = [];
        }
      })
      .addCase(asyncThunks.fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(asyncThunks.handleAddToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncThunks.handleAddToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.cart.push(action.payload);
        }
      })
      .addCase(asyncThunks.handleAddToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(asyncThunks.removeCardFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncThunks.removeCardFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && Array.isArray(action.payload.cart)) {
          state.cart = action.payload.cart.map((item) => item.card);
        } else {
          state.cart = [];
        }
      })
      .addCase(asyncThunks.removeCardFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(asyncThunks.updateCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncThunks.updateCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && Array.isArray(action.payload.cart)) {
          state.cart = action.payload.cart.map((item) => item.card);
        } else {
          state.cart = [];
        }
      })
      .addCase(asyncThunks.updateCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(asyncThunks.createCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncThunks.createCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && Array.isArray(action.payload.cart)) {
          state.cart = action.payload.cart.map((item) => item.card);
        } else {
          state.cart = [];
        }
      })
      .addCase(asyncThunks.createCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(asyncThunks.addCardDirectlyAndUpdate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        asyncThunks.addCardDirectlyAndUpdate.fulfilled,
        (state, action) => {
          state.status = 'succeeded';
          if (action.payload && Array.isArray(action.payload.cart)) {
            state.cart = action.payload.cart.map((item) => item.card);
          } else {
            state.cart = [];
          }
        }
      )
      .addCase(
        asyncThunks.addCardDirectlyAndUpdate.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const {
  toggleCartVisibility,
  changeCardQuantity,
  removeCardFromCart,
  addCardDirectly,
} = cartSlice.actions;
export const {
  fetchAllCarts,
  fetchCart,
  handleAddToCart,
  // removeCardFromCart,
  updateCart,
  createCart,
  addCardDirectlyAndUpdate,
} = asyncThunks;
export default cartSlice;
