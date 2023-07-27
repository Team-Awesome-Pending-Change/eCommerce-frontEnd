import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

// Create a context for the cardStore
const CardStoreContext = createContext();

export const CardStoreProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['cart']);
  const initialStore = cookies.store || [];
  const initialCart = cookies.cart || [];
  console.log('Initial cart:', initialCart);
  const [cardsArray, setCardsArray] = useState(initialStore);
  console.log('Initial store:', initialStore);
  const currentCart = cookies.cart || [];
  const [currenCartArray, setCurrentCartArray] = useState(currentCart);
  console.log('Current cart:', currentCart);
  if (!currenCartArray) {
    return <div>Loading...</div>;
  }

  const getCardData = (cardId) => {
    if (Array.isArray(currenCartArray)) {
      return currenCartArray.find((card) => card.id === cardId);
    }
    throw new Error('Cards data is not in the expected format');
  };

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * currenCartArray.length);
    const randomCardData = currenCartArray[randomIndex];
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
      value={{
        cardsArray,
        getCardData,
        randomCardData,
        setCardsArray,
        getRandomCard,
        setCookie,
        setCurrentCartArray,
        currenCartArray,
        initialStore,
        cookies,
        currentCart,
      }}
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
