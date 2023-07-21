
//! src/components/ProductCard.js
import React, { useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getCards  } from '../store/cards';

const ProductCard = () => {

  const cards = useSelector((state) => state.cards);
  console.log('this is cards from the store: ', cards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, []); //may need to put [dispatch] here if issues arise, currently can ignore the linter

 console.log('this is the card data right before MAP function', cards);
  return (
    <>

      {cards.length > 0 && cards.map((card) => (
        <Card key={card.id}>
          <CardMedia
            component="img"
            alt={card.name}
            image={card.card_images?.[0]?.image_url_small} />
          <CardContent>
            <Typography variant="h2" component="div">
              {card.name}
            </Typography>
            <Typography variant="body2">{card.card_rices?.[0]?.tcgplayer_price}</Typography>
          </CardContent>
            {/* View Product Details button down here and add to deck(stretch goal)*/}
          <CardActions>
            <Button size="small">Product Details</Button>
            <Button size="small">Add to Deck Builder</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};


export default ProductCard;









