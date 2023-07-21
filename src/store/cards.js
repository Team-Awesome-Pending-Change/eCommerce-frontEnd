import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const getCards = () => async (dispatch) => {
  let response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Tornado%20Dragon');
  dispatch(SET_CARDS(response.data.results));
  console.log('this is the card data from the api using the getCards function: ', response.data.results);
};

const cardSlice = createSlice({
  name: "cards",
  initialState: [],
  reducers: {
    SET_CARDS: (state, action) => {
      return {...state, cards: action.payload}
    }
  }
});


export const { SET_CARDS } = cardSlice.actions;
export default cardSlice.reducer;