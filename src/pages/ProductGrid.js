import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from '../components/cards/ProductCard';
import { CartContext } from '../context/CartContext/CartContext';

const useStyles = makeStyles(() => ({
  gridItem: {
    padding: '10px',
  },
}));

const ProductGrid = ({
  cardsToRender,
  handleRemoveCardFromCart,
  cardData,
  handleAddToCart,
}) => {
  const classes = useStyles();

  //access the functions from CartContext
  const { addOneToCart, removeOneFromCart, getCardQuantity } =
    useContext(CartContext);

  const isCardDataValid = cardsToRender && Array.isArray(cardsToRender);
  const limitedCardsToRender = Array.from(cardsToRender).slice(0, 30);

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
              card={card}
              handleAddToCart={() => addOneToCart(card.id)}
              handleRemoveCardFromCart={() => removeOneFromCart(card.id)}
              cardQuantity={getCardQuantity(card.id)}
              cardData={cardData}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default React.memo(ProductGrid);
