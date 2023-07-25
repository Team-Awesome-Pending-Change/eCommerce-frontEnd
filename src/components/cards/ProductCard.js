import React, { useCallback, useState } from 'react';
import { Cookies } from 'react-cookie';
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
import { cartActions, changeCardQuantity } from '../../store/reducers/cart';

const useStyles = makeStyles(() => ({
  cardStyle: {
    maxWidth: 345,
    flexGrow: 1,
    margin: '16px', // for margin
    padding: '16px', // for padding
  },
}));

const cookies = new Cookies();

const ProductCard = ({
  card,
  handleRemoveFromCart,
  handleAddToCart,
  cartData,
  ...props
}) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const classes = useStyles();
  const dispatcher = useDispatch();
  const state = useLocation();
  const cart = useSelector((storefrontState) => storefrontState.cart);
  console.log('cart', cart);
  const userId = cookies.get('userCookie'); // Fetch user id from userCookie
  console.log('user id', userId);
  console.log('card', card);
  console.log('state', state);
  console.log('state card', state.card);
  console.log('state', state);
  // const handleAddToCart = useCallback(
  //   (card, index) => {
  //     if (!card || typeof card !== 'object') {
  //       console.error('Invalid product');
  //       return;
  //     }

  //     const cardWithKey = {
  //       ...card,
  //       key: `${index}_${Math.random()}`,
  //     };

  //     try {
  //       dispatcher(cartActions.addToCart(cardWithKey)); // For adding a card to cart
  //       // persist the cart
  //       const updatedCart = [...cart, cardWithKey];
  //       cookies.set('cart', JSON.stringify(updatedCart), { path: '/' }); // Save cart to cookies
  //       // push the updated cart to the server
  //       dispatcher(cartActions.pushToServerCart({ userId, cart: updatedCart }));
  //     } catch (error) {
  //       console.error('Error while adding product to cart', error);
  //       // handle the error (show a message to the user, retry, etc.)
  //     }
  //   },
  //   [dispatcher, cart, userId]
  // );

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
        alt={card?.name}
        height="140"
        image={imgUrl || placeholderImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card?.card_prices?.[0]?.tcgplayer_price}
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
          onClick={() => handleAddToCart(card)}
        >
          Add to Cart
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => cartActions.removeFromCart(state.card)}
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
