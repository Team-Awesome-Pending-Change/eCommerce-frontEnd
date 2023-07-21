//! src/pages/Home.js
import React from "react";
import Carousel from 'react-bootstrap/Carousel';



const Home = () => {
  const items = [
    {
      image: "/yugiohCards.jpg",
      caption: "Yu-Gi-Oh!",
    },
    {
      image: "/pokemonCard.jpg",
      caption: "Pokemon",
    },
    {
      image: "/magicCard.jpg",
      caption: "Magic: The Gathering",
    },
  ];

  return (
    <>
      <h2 variant="h2">
        Welcome to Mythical Card-Mart!
      </h2>

      <Carousel>
        {items.map((item, i) => (
          <Carousel.Item key={i} item={item}>
            <img 
            src={item.image} 
            alt={item.caption} 
            style={{ width: '100%', height: 'auto'}}
            />
            <Carousel.Caption>
              Here we host a platform to buy your favorite trading cards. Have a collection that's missing a particular card? Check out our listings to see if you can find it! If you're looking to sell, soon we also have a platform for you to sell your cards to other collectors.
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Home;





