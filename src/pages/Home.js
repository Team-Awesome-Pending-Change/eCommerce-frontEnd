//! src/pages/Home.js
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const CarouselItem = ({ item }) => {
  const carouselImageStyle = {
    height: "60vh",
    width: "100%",
    backgroundImage: `url(${item.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Paper style={carouselImageStyle}>
      <Typography variant="h3" style={{ padding: "16px" }}>
        {item.caption}
      </Typography>
    </Paper>
  );
};

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
      <Typography variant="h2">
        Welcome to Mythical Card-Mart!
      </Typography>
      <Carousel>
        {items.map((item, i) => (
          <CarouselItem key={i} item={item} />
        ))}
      </Carousel>
      <Typography variant="body1">
        Here we host a platform to buy your favorite trading cards. Have a collection that's missing a particular card? Check out our listings to see if you can find it! If you're looking to sell, soon we also have a platform for you to sell your cards to other collectors.
      </Typography>
    </>
  );
};

export default Home;





