import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const server = process.env.REACT_APP_SERVER;
const initialState = {
  cart: [],
  totalAmount: 0,
  cartVisible: false,
  status: 'idle',
  error: null,
};

const axiosGet = (path, { userId, id }) =>
  axios
    .get(`${server}${path.replace(':userId', userId).replace(':id', id)}`)
    .then((response) => response.data);

const axiosSend = (method, path, { userId, ...data }) =>
  axios[method](
    `${server}${path.replace(':userId', userId).replace(':id', data.id)}`,
    data
  ).then((response) => response.data);

const asyncActions = [
  { name: 'fetchAllCarts', url: '/api/cart', method: 'get' },
  { name: 'fetchCart', url: '/api/cart/:id/getCart', method: 'get' },
  { name: 'handleAddToCart', url: '/api/cart/:userId', method: 'post' },
  {
    name: 'removeCardFromCart',
    url: '/api/cart/:userId/items/:id',
    method: 'delete',
  },
  { name: 'updateCart', url: '/api/cart', method: 'put' },
  { name: 'createCart', url: '/api/cart', method: 'post' },
  { name: 'pushToServerCart', url: '/api/cart/:userId', method: 'put' },
];

const asyncThunks = asyncActions.reduce((acc, action) => {
  const thunk = createAsyncThunk(
    `cart/${action.name}Async`,
    action.method === 'get'
      ? (args) => axiosGet(action.url, args)
      : (args) => axiosSend(action.method, action.url, args)
  );
  return { ...acc, [action.name]: thunk };
}, {});

// Asynchronous action to add card to the cart.
export const addCardToCartAsync = createAsyncThunk(
  'cart/addCard',
  async (card, { rejectWithValue }) => {
    try {
      // Replace this with the actual API endpoint and payload.
      const response = await axios.post('/api/cart', { card });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async action to fetch all carts
export const fetchAllCartsAsync = createAsyncThunk(
  'cart/fetchAllCartsAsync',
  async () => {
    const response = await api.fetchAllCarts(); // assuming you have a function named fetchAllCarts in api.js
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleCartVisibility(state) {
      state.cartVisible = !state.cartVisible;
    },
    changeCardQuantity(state, action) {
      const { id, quantityChange } = action.payload;
      const targetItem = state.cart.find((item) => item.id === id);
      if (targetItem) {
        targetItem.quantity += quantityChange;
      }
    },
    removeCardFromCart(state, action) {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    addCardDirectly(state, action) {
      const card = action.payload;
      const existingItem = state.cart.find((item) => item.id === card.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ id: card.id, quantity: 1 });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending((action) => Object.values(asyncThunks).includes(action.type)),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isFulfilled((action) =>
          Object.values(asyncThunks).includes(action.type)
        ),
        (state, action) => {
          state.status = 'succeeded';
          if (Array.isArray(action.payload)) {
            state.cart = action.payload;
          }
        }
      )
      .addMatcher(
        isRejected((action) =>
          Object.values(asyncThunks).includes(action.type)
        ),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addCase(addCardToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCardToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the new card to the state.
        state.items.push(action.payload);
      })
      .addCase(addCardToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllCartsAsync.fulfilled, (state, action) => {
        // handle the state update when the promise is resolved
      });
  },
});

// export const {
//   toggleCartVisibility,
//   changeCardQuantity,
//   removeCardFromCart,
//   addCardDirectly,
//   fetchCart,
//   fetchAllCarts,
//   handleAddToCart,
//   removeCardFromCartAsync,
//   updateCartAsync,
//   createCartAsync,
// } = cartSlice.actions;
// export default cartSlice;
// export const cartAsyncActions = asyncThunks;
export const {
  toggleCartVisibility,
  changeCardQuantity,
  removeCardFromCart,
  addCardDirectly,
} = cartSlice.actions;

export const { actions: cartActions, reducer: cartReducer } = cartSlice;

export const asyncActions = {
  fetchAllCartsAsync: asyncThunks.fetchAllCarts,
  fetchCartAsync: asyncThunks.fetchCart,
  handleAddToCartAsync: asyncThunks.handleAddToCart,
  removeCardFromCartAsync: asyncThunks.removeCardFromCart,
  updateCartAsync: asyncThunks.updateCart,
  createCartAsync: asyncThunks.createCart,
  pushToServerCartAsync: asyncThunks.pushToServerCart,
};

export default cartSlice;
