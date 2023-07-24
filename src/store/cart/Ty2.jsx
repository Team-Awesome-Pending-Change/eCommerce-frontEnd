// Importing the createSlice function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Asynchronously replenish card stock in server-side database
export const replenishStockInServer = (card) => async () => {
  // Convert card ID to a string
  console.log('DOES CARD HAVE ID:', card);
  const id = String(card._id);

  // Fetch the card data from the server
  const response = await fetch(`http://localhost:3001/api/cards/${id}`);
  console.log('store, cart, replenishStockInServer, response', response);

  // Parse the JSON response
  const existingCard = await response.json();

  // Calculate new stock amount
  const updateBody = { inStock: existingCard.inStock + card.quantity };

  // Send a PUT request to update the card stock on the server
  await fetch(`http://localhost:3001/api/cards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(updateBody),
  });
};

// Asynchronously adjust card stock on server-side database based on quantity change
export const adjustStockOnServer =
  ({ id, quantityChange }) =>
  async () => {
    try {
      // Fetch the card data from the server
      const response = await fetch(`http://localhost:3001/api/cards/${id}`);

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const cardData = await response.json();

      // Check for sufficient stock before adding to cart
      if (quantityChange > 0 && cardData.inStock <= 0) {
        throw new Error(
          'Cannot add more items to your cart. Item might be out of stock.'
        );
      }

      // Calculate new stock amount after change
      const updateBody = { inStock: cardData.inStock + quantityChange };

      // Send a PUT request to update the card stock on the server
      const updateResponse = await fetch(
        `http://localhost:3001/api/cards/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(updateBody),
        }
      );

      // Check if the update response is okay
      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }
    } catch (error) {
      console.error('A problem occurred while adjusting the stock:', error);
    }
  };

// Create a Redux slice for cart operations
const cartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    cards: [],
    totalAmount: 0,
    cartVisible: false,
  },
  reducers: {
    // Reducer to add a card to cart
    addCardToCart(state, action) {
      const card = action.payload;
      let newItem = {
        key: card.key,
        category: card.category,
        name: card.name,
        price: card.price,
        quantity: 1,
      };
      console.log('store, cart, addCardToCart, newItem', newItem);
      // Add new item to cards array and update total cart amount
      state.cards = [...state.cards, newItem];
      state.totalAmount += card.price;
    },

    // Reducer to remove a card from cart
    removeCardFromCart(state, action) {
      let filteredItems = state.cards.filter(
        (card) => card.key !== action.payload.key
      );

      // Update total amount after card removal
      let updatedTotal = filteredItems.reduce(
        (acc, current) => acc + current.price * current.quantity,
        0
      );

      state.cards = filteredItems;
      state.totalAmount = updatedTotal;
    },

    // Reducer to change the quantity of a card in cart
    changeCardQuantity(state, action) {
      const { id, quantityChange } = action.payload;
      console.log(
        'changeCardQuantity - id, quantityChange: ',
        id,
        quantityChange
      );

      let currentItems = [...state.cards];
      let targetItem = currentItems.find((item) => item.key === id);

      if (targetItem) {
        targetItem.quantity += quantityChange;

        if (targetItem.quantity === 0) {
          currentItems = state.cards.filter((item) => item.key !== id);
        }

        let updatedTotal = currentItems.reduce(
          (acc, current) => acc + current.price * current.quantity,
          0
        );

        state.cards = currentItems;
        state.totalAmount = updatedTotal;
      } else {
        console.warn(`Item with id ${id} not found in cart`);
      }
    },

    // Reducer to toggle cart visibility
    toggleCartVisibility(state) {
      state.cartVisible = !state.cartVisible;
    },
  },
});

// Export all cart actions
export const {
  addCardToCart,
  removeCardFromCart,
  removeProductFromCart,
  fetchAllCarts,
  fetchCart,
  // updateProductQuantity,
  cart,
  changeCardQuantity,
  toggleCartVisibility,
} = cartSlice.actions;

// Export the slice reducer
export default cartSlice;
