import { createContext, useContext, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

// Create a context for the cardStore
const CardStoreContext = createContext();

// In CardStore.js
export const CardStoreProvider = ({ children }) => {
  const cookies = new Cookies();
  const initialCart = cookies.get('cart') || [];
  console.log('Initial cart:', initialCart); // Log initial cart data
  const [cardsArray, setCardsArray] = useState(initialCart);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/api/cards/ygopro`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          console.log('Fetched data:', data); // Log fetched data
          setCardsArray(data);
          cookies.set('cart', data, { path: '/' });
        }
      } catch (error) {
        console.error(`Failed to fetch cards data: ${error.message}`);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!cardsArray) {
    return <div>Loading...</div>; // or some loading indicator
  }

  // Define the getCardData function
  const getCardData = (cardId) => {
    if (Array.isArray(cardsArray)) {
      return cardsArray.find((card) => card.id === cardId);
    }
    throw new Error('Cards data is not in the expected format');
  };

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cardsArray.length);
    const randomCardData = cardsArray[randomIndex];
    return randomCardData;
  };

  const randomCardData = getRandomCard();

  // Render the CardStoreContext Provider, passing the cards array, getCardData function, and randomCardData as its value
  return (
    <CardStoreContext.Provider
      value={{ cardsArray, getCardData, randomCardData }}
    >
      {children}
    </CardStoreContext.Provider>
  );
};

// Update useCardStore to return randomCardData
export const useCardStore = () => {
  const context = useContext(CardStoreContext);
  if (!context) {
    throw new Error('useCardStore must be used within a CardStoreProvider');
  }
  const { cardsArray, getCardData, randomCardData } = context;
  return { cardsArray, getCardData, randomCardData };
};
