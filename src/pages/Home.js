//! src/pages/Home.js
import React from "react";
import { styled } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const useStyles = styled((theme) => ({
  carouselImage: {
    height: "800px",
    width: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselCaption: {
    padding: theme.spacing(2),
  },
}));

const CarouselItem = ({ item }) => {
  const classes = useStyles();
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
      image: "https://unsplash.com/photos/czMeCTUJe58",
      caption: "Yu-Gi-Oh!",
    },
    {
      image: "https://unsplash.com/photos/3AXHEbe9CaA",
      caption: "Pokemon",
    },
    {
      image: "https://unsplash.com/photos/Vp8RnXSnJ6I",
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




