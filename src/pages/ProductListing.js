//! src/pages/ProductListing.js
import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const ProductListing = () => {
  const [cards, setCards] = useState([]);

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
          //trying to dig into the data object to get to the data array
          setCards(data.data);
          // Save data to localStorage to prevent unnecessary API calls
          localStorage.setItem('cachedCards', JSON.stringify(data));
          console.log('this is the card data from api: ', data.data);

        } catch (error) {
          console.error('Error in data fetch from API: ', error);
        }
      };
      getCards();
    }
  }, []);
  
  //!! using any .property after to dig into the object is undefined, trying to fix. Reece @ 0830 7/21
  console.log('this is the card data right before MAP function', cards);
  return (
    <div className='product-listing'>
      <h2>Product Listings</h2>
      {cards.length > 0 && cards.map((card) => (
        <Link to={`/products/${card.id}`} key={card.id}>
          <ProductCard cards={cards} />
        </Link>
       ))} 
    </div>
  );
};

export default ProductListing;
