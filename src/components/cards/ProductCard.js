import { Card, Button, Grid, CardContent, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CartContext } from '../../context/CartContext/CartContext';
import { useContext, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import placeholderImage from '../../assets/placholder.jpeg';
import CardModal from '../modals/CardModal';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '16px',
    padding: '16px',
  },
  button: {
    margin: '0 8px',
  },
});

const ProductCard = ({ card = {} }) => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const openCardModal = () => setCardModalOpen(true);
  const closeCardModal = () => setCardModalOpen(false);

  const { getCardQuantity, addOneToCart, removeOneFromCart, deleteFromCart } =
    useContext(CartContext);

  const productQuantity = card.id ? getCardQuantity(card.id) : 0;
  const imgUrl = card?.card_images?.[0]?.image_url || '';
  const classes = useStyles();

  return (
    <Card className={classes.card}>
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
        {productQuantity > 0 ? (
          <>
            <Grid container>
              <Grid item xs={6}>
                In Cart: {productQuantity}
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => addOneToCart(card.id)} // Here
                  className={classes.button}
                >
                  +
                </Button>
                <Button
                  onClick={() => removeOneFromCart(card.id)} // And here
                  className={classes.button}
                >
                  -
                </Button>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteFromCart(card.id)} // And here
              className={classes.button}
            >
              Remove from cart
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => addOneToCart(card.id)} // And here
            className={classes.button}
          >
            Add To Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
