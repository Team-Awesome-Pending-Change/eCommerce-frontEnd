import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import placeholderImage from '../../assets/placholder.jpeg';

const ProductCard = ({ card, handleAddToCart }) => {
  const imgUrl = card?.card_images[0]?.image_url_small || '';
  // const loadedImgUrl = loadDeckCards?.card_images?.image_url_small || '';
  return (
    <Card key={card.id}>
      <CardMedia
        component="img"
        alt={card.name}
        image={imgUrl || placeholderImage}
      />
      <CardContent>
        <Typography variant="h2" component="div">
          {card.name}
        </Typography>
        <Typography variant="body2">
          {card.card_prices?.[0]?.tcgplayer_price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Product Details</Button>
        <Button size="small" onClick={() => handleAddToCart(card)}>
          Add to Cart
        </Button>
        <Button size="small">Add to Deck Builder</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
