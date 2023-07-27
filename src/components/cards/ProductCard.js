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
  largerButton: {
    // Added new style for larger buttons
    margin: '0 8px',
    padding: '10px', // Adjust padding as required
    fontSize: '20px', // Adjust font size as required
  },
});

const ProductCard = ({ cardInfo, index, ...props }) => {
  if (!cardInfo) {
    // If the cardInfo is undefined, handle the case gracefully (optional)
    return <div>Card data not available.</div>;
  }

  const { id, name } = cardInfo;
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const openCardModal = () => setCardModalOpen(true);
  const closeCardModal = () => setCardModalOpen(false);

  const { getCardQuantity, addOneToCart, removeOneFromCart, deleteFromCart } =
    useContext(CartContext);

  const productQuantity = cardInfo.id ? getCardQuantity(cardInfo) : 0;
  // const productQuantity = cardInfo.id ? cardInfo.quantity : 0;
  const imgUrl = cardInfo?.card_images?.[0]?.image_url || '';
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt={cardInfo?.name}
        height="140"
        image={imgUrl || placeholderImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cardInfo?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardInfo?.card_prices?.[0]?.tcgplayer_price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={openCardModal}>
          Product Details
        </Button>
        <CardModal
          isOpen={isCardModalOpen}
          onClose={closeCardModal}
          cardInfo={cardInfo}
        />
        {productQuantity > 0 ? (
          <>
            <Grid container>
              <Grid item xs={6}>
                In Cart: {productQuantity}
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => addOneToCart(cardInfo)}
                  className={classes.largerButton} // Used largerButton class
                >
                  +
                </Button>
                <Button
                  onClick={() => removeOneFromCart(cardInfo)}
                  className={classes.largerButton} // Used largerButton class
                >
                  -
                </Button>
              </Grid>
            </Grid>
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteFromCart(cardInfo)}
              className={classes.button}
            >
              Remove from cart
            </Button> */}
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => addOneToCart(cardInfo)}
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
