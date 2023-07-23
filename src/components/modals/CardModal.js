import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
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
import { useDispatch } from 'react-redux';
import { addCardToCartAsync, removeCardFromCartAsync } from '../../store/cart';
const CardModal = ({ isOpen, onClose, cardInfo }) => {
  const dispatch = useDispatch();

  const imgSrc = cardInfo?.card_images[0]?.image_url;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{cardInfo.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Image src={imgSrc} aspectRatio={2 / 3} />
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(addCardToCartAsync(cardInfo.id))}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(removeCardFromCartAsync(cardInfo.id))}
            >
              Remove
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardDetail
              icon={<FaLevelUpAlt />}
              title="Level"
              value={cardInfo.level}
            />
            <CardDetail
              icon={<FaVenusMars />}
              title="Type"
              value={cardInfo.type}
            />
            <CardDetail
              icon={<FaDragon />}
              title="Race"
              value={cardInfo.race}
            />
            <CardDetail
              icon={<FaRegLightbulb />}
              title="Attribute"
              value={cardInfo.attribute}
            />
            <CardDetail title="ATK" value={cardInfo.atk} />
            <CardDetail
              icon={<FaShieldAlt />}
              title="DEF"
              value={cardInfo.def}
            />
            <CardDetail
              icon={<FaRegCopy />}
              title="Description"
              value={cardInfo.description}
            />
            <Typography>{cardInfo.desc}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const CardDetail = ({ icon, title, value }) => (
  <Box display="flex" alignItems="center" my={1}>
    {icon && icon}{' '}
    <Typography variant="h6">
      {title}: {value}
    </Typography>
  </Box>
);

export default CardModal;
