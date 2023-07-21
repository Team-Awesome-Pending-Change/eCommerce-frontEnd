//! src/components/ProductCard.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 200px;
  margin: 1rem;

  img {
    width: 100%;
    height: auto;
  }
`;

const ProductCard = () => {
    const [card, setCards] = useState([]);

    useEffect(() => {

      // Check if data is available in localStorage
      const cachedData = localStorage.getItem('cachedCards');
      //if there is cached data, use that instead of fetching from API
      if (cachedData) {
        setCards(JSON.parse(cachedData));
        console.log('this is our LS cachedData: ', JSON.parse(cachedData));
        
      } else {
        const getCards = async () => {
          try {
            const { data } = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Tornado%20Dragon');
            setCards(data);

            // Save data to localStorage to prevent unnecessary API calls
            localStorage.setItem('cachedCards', JSON.stringify(data));
            console.log('this is the card data from api: ', data);

          } catch (error) {
            console.error('Error in data fetch from API: ', error);
          }
        };
        getCards();
      }
    }, []);

    console.log('this is the card data right before MAP function',card.name);
 return (
    <>
    {/* card.length > 0 & Array.isArray(card) both work to prevent the map from firing immediately while the array is empty which causes error*/}
      {card.length > 0 && card.map((card) => (
        <Card key={card.id}>
          <h3>{card.name}</h3>
          <img src={card.card_images[0].image_url} alt={card.name} />
          <p>{card.card_prices[0].tcgplayer_price}</p>
          {/* You can add more product details here */}
        </Card>
      ))}
    </>
  );
};


export default ProductCard;








