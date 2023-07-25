import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import placeholderImage from '../../assets/placholder.jpeg';
import CardModal from '../modals/CardModal';
import { useLocation } from 'react-router';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { changeCardQuantity } from '../../store/cart/Ty2';

const useStyles = makeStyles(() => ({
  cardStyle: {
    maxWidth: 345,
    flexGrow: 1,
    margin: '16px', // for margin
    padding: '16px', // for padding
  },
}));

const ProductCard = ({
  card,
  selectedCard,
  // handleAddToCart,
  handleRemoveProductFromCart,
  cartData,
  cardData,
}) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const classes = useStyles();
  // const cartData = useSelector((storefrontState) => storefrontState.cart);
  const dispatcher = useDispatch();
  const state = useLocation();
  console.log('selectedCard', selectedCard);

  const handleAddProductToCart = (product) => {
    console.log('handleAddProductToCart - product: ', product);

    if (!product || typeof product !== 'object') {
      console.error('Invalid product');
      return;
    }

    const uniqueProductId = `${product._id}_${Date.now()}_${Math.random()}`;
    product._id = uniqueProductId;

    const productInCart = cartData.items?.find(
      (item) => item._id === product._id
    );
    console.log('productInCart', productInCart);
    if (!productInCart) {
      dispatcher(changeCardQuantity({ id: product._id, quantityChange: 1 }));
    } else {
      dispatcher(changeCardQuantity({ id: product._id, quantityChange: 1 }));
    }
  };

  const openCardModal = () => {
    setCardModalOpen(true);
  };

  const closeCardModal = () => {
    setCardModalOpen(false);
  };

  const imgUrl = card?.card_images?.[0]?.image_url || '';

  return (
    <Card className={classes.cardStyle}>
      <CardMedia
        component="img"
        alt={card.name}
        height="140"
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
          cardInfo={card}
        />
        <Button
          size="small"
          color="primary"
          onClick={() => handleAddProductToCart(state.card)}
        >
          Add to Cart
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => handleRemoveProductFromCart(state.card)}
        >
          Remove from Cart
        </Button>
        <Button size="small" color="primary">
          Add to Deck Builder
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
