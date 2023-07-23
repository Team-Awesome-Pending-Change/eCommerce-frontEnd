import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import placeholderImage from '../../assets/placholder.jpeg';
import CardModal from '../modals/CardModal';

const ProductCard = ({ card, handleAddToCart }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  console.log('product card', card);
  const openCardModal = () => {
    setCardModalOpen(true);
  };

  const closeCardModal = () => {
    setCardModalOpen(false);
  };

  const imgUrl = card?.card_images?.[0]?.image_url || '';

  return (
    <Card>
      <CardMedia
        component="img"
        alt={card.name}
        height="200"
        image={imgUrl || placeholderImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.card_prices?.[0]?.tcgplayer_price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={openCardModal}>
          Product Details
        </Button>
        <CardModal
          isOpen={isCardModalOpen}
          onClose={closeCardModal}
          handleAddToCart={handleAddToCart}
          cardInfo={card}
        />
        <Button
          size="small"
          color="primary"
          onClick={() => handleAddToCart(card)}
        >
          Add to Cart
        </Button>
        <Button size="small" color="primary">
          Add to Deck Builder
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
