import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    }
  },
  REMOVE_FROM_CART: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload.id)
    };
  },
});

export const { ADD_TO_CART, REMOVE_FROM_CART } = cartSlice.actions;
export default cartSlice.reducer;
