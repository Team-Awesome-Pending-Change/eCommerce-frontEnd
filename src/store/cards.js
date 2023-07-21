import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const getCards = () => async (dispatch) => {
  try {
    let response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Tornado%20Dragon');
    dispatch(setCards(response.data.data)); // Update the dispatch to use the correct action type and payload
    console.log('this is the card data from the api using the getCards function: ', response.data.data);
  } catch (error) {
    console.error('Error fetching data from the API: ', error);
  }
};

const cardSlice = createSlice({
  name: "cards",
  initialState: [],
  reducers: {
    setCards: (state, action) => { // Update the reducer name to setCards
      return action.payload; // Replace the state with the payload directly since it's an array
    }
  }
});

export const { setCards } = cardSlice.actions; // Update the action export to use setCards
export default cardSlice.reducer;