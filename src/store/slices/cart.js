const apiUrl = 'http://localhost:3001/api/cards';

// Define a helper function to reduce repetition
const createCardThunk = (type, path = '') =>
  createAsyncThunk(`cards/${type}`, async (query) => {
    const url = query
      ? `${apiUrl}${path}?${query}=${encodeURIComponent(query)}`
      : apiUrl;
    const response = await axios.get(url);
    return response.data;
  });

export const getAllCards = createCardThunk('getAllCards');
export const getCardByName = createCardThunk('getCardByName', '?name');
export const getCardByType = createCardThunk('getCardByType', '?type');
export const getCardByAttribute = createCardThunk(
  'getCardByAttribute',
  '?attribute'
);

const fulfilledActions = [
  loadCardsFromAPI.fulfilled,
  getAllCards.fulfilled,
  getCardByName.fulfilled,
  getCardByType.fulfilled,
  getCardByAttribute.fulfilled,
];

const cardSlice = createSlice({
  name: 'cards',
  initialState: { cards: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Common handler for actions that update `cards` and `status` in the same way
      .addMatcher(
        (action) => fulfilledActions.includes(action.type),
        (state, action) => {
          state.cards = action.payload;
          state.status = 'succeeded';
        }
      )
      .addCase(adjustStockOnAddingToCart.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addCardToDatabase.fulfilled, (state, action) => {
        state.cards = [...state.cards, action.payload];
        state.status = 'succeeded';
      })
      .addCase(deleteCardFromDatabase.fulfilled, (state, action) => {
        state.cards = state.cards.filter(
          (card) => card.id !== action.payload.id
        );
        state.status = 'succeeded';
      });
  },
});

export default cardSlice;
