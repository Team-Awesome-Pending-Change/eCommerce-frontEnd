import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  padding: 1rem;
  max-width: 900px;
`;

const WelcomeTitle = styled.h2`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const StyledCarouselItem = styled(Carousel.Item)`
  img {
    width: 100%;
    height: auto;
  }

  .carousel-caption {
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
  }
`;

const Home = () => {
  const items = [
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

  return (
    <HomePageContainer>
      <WelcomeTitle>Welcome to Mythical Card-Mart!</WelcomeTitle>

      <Carousel>
        {items.map((item, i) => (
          <StyledCarouselItem key={i}>
            <img src={item.image} alt={item.caption} />
            <Carousel.Caption>
              Here we host a platform to buy your favorite trading cards. Have a
              collection that&apos;s missing a particular card? Check out our
              listings to see if you can find it! If you&apos;re looking to
              sell, soon we also have a platform for you to sell your cards to
              other collectors.
            </Carousel.Caption>
          </StyledCarouselItem>
        ))}
      </Carousel>
    </HomePageContainer>
  );
};

export default Home;
