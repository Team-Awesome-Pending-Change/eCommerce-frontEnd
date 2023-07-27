import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

// Create a context for the cardStore
const CardStoreContext = createContext();

export const CardStoreProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['cart']);
  const initialCart = cookies.cart || [];
  console.log('Initial cart:', initialCart);
  const [cardsArray, setCardsArray] = useState(initialCart);

  if (!cardsArray) {
    return <div>Loading...</div>;
  }

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

  // In CardStoreProvider component

  console.log('Context value: ', {
    cardsArray,
    getCardData,
    getRandomCard,
    setCardsArray,
  });

  return (
    <CardStoreContext.Provider
      value={{ cardsArray, getCardData, randomCardData, setCardsArray }}
    >
      {children}
    </CardStoreContext.Provider>
  );
};

export const useCardStore = () => {
  const context = useContext(CardStoreContext);
  if (!context) {
    throw new Error('useCardStore must be used within a CardStoreProvider');
  }
  const { cardsArray, getCardData, getRandomCard, setCardsArray } = context; // change here
  return { cardsArray, getCardData, getRandomCard, setCardsArray }; // change here
};
