//! src/pages/Home.js
import React from "react";
import { makeStyles } from "@mui/styles";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  carouselImage: {
    height: "400px",
    width: "100%",
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
      image: "https://source.unsplash.com/featured/?yugioh",
      caption: "Yu-Gi-Oh!",
    },
    {
      image: "https://source.unsplash.com/featured/?magic",
      caption: "Magic: The Gathering",
    },
    {
      image: "https://source.unsplash.com/featured/?pokemon",
      caption: "Pokemon",
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




