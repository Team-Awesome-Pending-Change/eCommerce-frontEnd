// Importing necessary modules and components
import React, { useEffect } from 'react'; // React library and useEffect hook for side effects
import { useSelector, useDispatch } from 'react-redux'; // Redux hooks for dispatching actions and accessing the state
import styled from 'styled-components'; // For CSS in JS styling
import ProductCard from '../components/cards/ProductCard'; // Component for displaying individual product
import { addItemToCartAsync } from '../store/cart'; // Action for adding product to cart
import {
  // Importing card-related actions
  getAllCards,
  getCardByName,
  getCardByType,
  getCardByAttribute,
} from '../store/cards/cards';

// Styled component for the store container
const StoreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f7f7f7;
`;

// Styled component for the store title
const StoreTitle = styled.h2`
  grid-column: span 3;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

// Store component
const Store = () => {
  const dispatch = useDispatch(); // Hook for dispatching Redux actions

  // Side effect to fetch all cards once on component mount
  useEffect(() => {
    dispatch(getAllCards())
      .then(() => console.log('Cards fetched successfully'))
      .catch((error) => console.log('Error fetching cards: ', error));
  }, [dispatch]);

  const cards = useSelector((state) => state.cards); // Selecting cards from Redux state

  // Function for handling add to cart action
  const handleAddToCart = (card) => {
    dispatch(addItemToCartAsync(card));
    console.log('Card added to cart: ', card);
  };

  // Render store container, title, and product cards
  return (
    <StoreContainer>
      <StoreTitle>Store</StoreTitle>
      {cards &&
        cards.map((card) => (
          <ProductCard
            key={card.id}
            card={card}
            handleAddToCart={() => handleAddToCart(card)}
          />
        ))}
    </StoreContainer>
  );
};

// Export the Store component as default
export default React.memo(Store);
