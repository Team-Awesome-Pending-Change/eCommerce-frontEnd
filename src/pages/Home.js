//! src/pages/Home.js
import React from "react";
import { styled } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const useStyles = styled((theme) => ({
  height: "400px", // Set the height for the carousel item
  width: "100%", // Use 100% width to fill the carousel item
  backgroundImage: props => `url(${props.image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .caption": {
    padding: theme.spacing(2),
  },
}));

const CarouselItem = ({ item }) => {
  const classes = useStyles({ image: item.image });
  return (
    <Paper
      className={classes.carouselImage}
      style={{ backgroundImage: `url(${item.image})` }}
    >
      <Typography variant="h3" className={classes.carouselCaption}>
        {item.caption}
      </Typography>
    </Paper>
  );
};

const Home = () => {
  const classes = useStyles();
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
      <Typography variant="h2" className={classes.header}>
        Welcome to Mythical Card-Mart!
      </Typography>
      <Typography variant="body1" className={classes.description}>
        Here we host a platform to buy your favorite trading cards. Have a collection that's missing a particular card? Check out our listings to see if you can find it! If you're looking to sell, soon we also have a platform for you to sell your cards to other collectors. 
      </Typography>
      <Carousel>
        {items.map((item, i) => (
          <CarouselItem key={i} item={item} />
        ))}
      </Carousel>
    </>
  );
};

export default Home;




