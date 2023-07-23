import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  arrowStyles: {
    height: 'auto',
    width: '100%',
  },
  imageStyles: {
    height: '600px',
    width: '300px',
  },
});

const Home = () => {
  const classes = useStyles();

  const carouselImages = [
    {
      image: '/yugiohCards.jpg',
      caption: 'Yu-Gi-Oh!',
    },
    {
      image: '/pokemonCard.jpg',
      caption: 'Pokemon',
    },
    {
      image: '/magicCard.jpg',
      caption: 'Magic: The Gathering',
    },
  ];

  const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
  };

  const indicatorStyles = {
    background: '#000',
    width: 30,
    height: 3,
    display: 'inline-block',
    margin: '0 8px',
  };

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(to right, #add8e6, #87ceeb)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        sx={{
          padding: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: 10,
        }}
        maxWidth="md"
      >
        <Typography variant="h2" gutterBottom align="center" color="primary">
          Welcome to Mythical Card-Mart!
        </Typography>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <div
                style={{ ...arrowStyles, left: 15 }}
                onClick={onClickHandler}
                className={classes.arrowStyles}
              >
                {'<'}
              </div>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <div
                style={{ ...arrowStyles, right: 15 }}
                onClick={onClickHandler}
                className={classes.arrowStyles}
              >
                {'>'}
              </div>
            )
          }
        >
          {carouselImages.map((item, i) => (
            <div key={i}>
              <img
                src={item.image}
                alt={item.caption}
                className={classes.imageStyles}
              />
              <Box
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: 2,
                  borderRadius: 2,
                  color: 'white',
                }}
              >
                <Typography>
                  Here we host a platform to buy your favorite trading cards.
                  Have a collection thats missing a particular card? Check out
                  our listings to see if you can find it! If youre looking to
                  sell, soon we also have a platform for you to sell your cards
                  to other collectors.
                </Typography>
              </Box>
            </div>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};

export default Home;
