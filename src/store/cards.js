import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

// Function to check if data is expired in local storage
const isDataExpired = (cachedTime, expiryInHours) => {
  const currentTime = new Date().getTime();
  const expiryTime = cachedTime + expiryInHours * 60 * 60 * 1000; // Expiry time in milliseconds pulled from web for 12 hours
  return currentTime >= expiryTime;
};

export const getCards = () => async (dispatch) => {
  try {
    // Check if data is in local storage
    const cachedData = localStorage.getItem("cachedCards");
    console.log('this is the cached data: ', JSON.parse(cachedData));
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      // Check if data is expired
      if (!isDataExpired(timestamp, 12)) {
        // If not expired, dispatch the data from local storage
        dispatch(setCards(data));
        return;
      }
    }

    // If data is expired or not in local storage, fetch from API
    let response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Tornado%20Dragon'); //add  to grab single card
    
    const data = response.data.data;
    const timestamp = new Date().getTime();

    // Save data to local storage
    localStorage.setItem("cachedCards", JSON.stringify({ data, timestamp }));

    dispatch(setCards(data)); // Update the dispatch to use correct data that comes from the API
    console.log('this is the card data from the api using the getCards function: ', data);
  } catch (error) {
    console.error('Error fetching data from the API: ', error);
  }
};

const cardSlice = createSlice({
  name: "cards",
  initialState: [],
  reducers: {
    setCards: (state, action) => { 
      return action.payload;
    }
  }
});

export const { setCards } = cardSlice.actions;
export default cardSlice.reducer;