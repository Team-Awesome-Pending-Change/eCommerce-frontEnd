import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegCopy,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import Image from 'material-ui-image';
import { useDispatch, useSelector } from 'react-redux';
import { asyncActions } from '../../store/reducers/cart';

const CardModal = ({ isOpen, onClose, cardInfo }) => {
  // console.log('card modal', cardInfo);
  const dispatch = useDispatch();

  const cardData = useSelector((state) => state.cards);
  const cartData = useSelector((state) => state.cart);
  const cartState = useSelector((storefrontState) => storefrontState.cart);
  // console.log('cart state', cartState);
  // console.log('cart data', cartData);
  // console.log('card data', cardData);
  const handleAddCardToCart = useCallback(
    (cardInfo) => {
      if (cardInfo) {
        // dispatch(handleAddToCart(cartData, cardData));
        // dispatch(addCardDirectly(cardInfo.id));
        dispatch(asyncActions.addToCart(cardInfo.id));
      }
    },
    [dispatch, cardInfo]
  );

  const handleRemoveCardFromCart = useCallback(() => {
    if (cardInfo) {
      dispatch(asyncActions.removeFromCart(cardInfo.id));
    }
  }, [dispatch, cardInfo]);

  const imgSrc = cardInfo?.card_images?.[0]?.image_url;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{cardInfo?.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {imgSrc && <Image src={imgSrc} aspectRatio={2 / 3} />}
            <Button
              size="small"
              color="primary"
              onClick={() => handleAddCardToCart(cardInfo)}
            >
              Add to Cart
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleRemoveCardFromCart}
            >
              Remove
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardDetail
              icon={<FaLevelUpAlt />}
              title="Level"
              value={cardInfo?.level}
            />
            <CardDetail
              icon={<FaVenusMars />}
              title="Type"
              value={cardInfo?.type}
            />
            <CardDetail
              icon={<FaDragon />}
              title="Race"
              value={cardInfo?.race}
            />
            <CardDetail
              icon={<FaRegLightbulb />}
              title="Attribute"
              value={cardInfo?.attribute}
            />
            <CardDetail title="ATK" value={cardInfo?.atk} />
            <CardDetail
              icon={<FaShieldAlt />}
              title="DEF"
              value={cardInfo?.def}
            />
            <CardDetail
              icon={<FaRegCopy />}
              title="Description"
              value={cardInfo?.description}
            />
            {cardInfo?.desc && <Typography>{cardInfo.desc}</Typography>}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const CardDetailComponent = ({ icon, title, value }) => (
  <Box display="flex" alignItems="center" my={1}>
    {icon && <>{icon} </>}
    <Typography variant="h6">
      {title}: {value}
    </Typography>
  </Box>
);

const CardDetail = React.memo(CardDetailComponent);

export default CardModal;
