import React, { useContext, useMemo } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from '../components/cards/ProductCard';
import { CartContext } from '../context/CartContext/CartContext';

const useStyles = makeStyles(() => ({
  gridItem: {
    padding: '10px',
  },
}));

const ProductGrid = ({ cardsArray, handleAddToCart }) => {
  // console.log('cardsArray', cardsArray);
  const classes = useStyles();

  // Access the functions from CartContext
  const { deleteFromCart, getCardQuantity } = useContext(CartContext);

  const isCardDataValid = cardsArray && Array.isArray(cardsArray);

  // Use useMemo to compute limitedCardsToRender only when cardsArray changes
  const limitedCardsToRender = useMemo(
    () => (cardsArray ? Array.from(cardsArray).slice(0, 30) : []),
    [cardsArray]
  );

  return (
    <Grid item xs={12} container>
      {isCardDataValid &&
        limitedCardsToRender.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={card.id}
            className={classes.gridItem}
          >
            <ProductCard
              cardInfo={card}
              handleAddToCart={() => handleAddToCart(card.id)}
              handleRemoveCardFromCart={() => deleteFromCart(card.id)}
              cardQuantity={getCardQuantity(card.id)}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default React.memo(ProductGrid);
