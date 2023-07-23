import React from 'react';
import {
  Button,
  Grid,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import Image from 'material-ui-image';
import {
  FaLevelUpAlt,
  FaShieldAlt,
  FaRegCopy,
  FaVenusMars,
  FaDragon,
  FaRegLightbulb,
} from 'react-icons/fa';

const CardModal = ({
  isOpen,
  onClose,
  cardInfo,
  safeDeck,
  loadedCardInfo,
  cardAddedToDeck,
  setCardAddedToDeck,
  cards,
  loadedCards,
  deck,
  setDeck,
  loadDeck,
  setLoadDeck,
  setCurrentlyEditingDeck,
  currentlyEditingDeck,
}) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const onAddClick = (info) => {
    if (!currentlyEditingDeck) {
      setIsAlertOpen(true);
    } else {
      determineCardForAdd(info);
    }
  };

  const handleAlertClose = () => setIsAlertOpen(false);

  const handleConfirmNewDeck = (info) => {
    setCurrentlyEditingDeck(false);
    determineCardForAdd(info);
    handleAlertClose();
  };
  console.log('currentlyEditingDeck', currentlyEditingDeck);
  // const determineDeckToAddTo = (info) => {
  //   if (currentlyEditingDeck === false) {
  //     determineCardForAdd(info);
  //   }
  const determineCardForAdd = (info) => {
    // choose the right deck
    const currentDeck = info === cardInfo ? cards : loadedCards;

    const cardCount = currentDeck.filter(
      (card) => card?.id === info?.id
    ).length;

    if (cardCount < 3) {
      console.log('info', info);

      if (info === cardInfo) {
        const newDeck = [...deck, cardInfo];
        setDeck(newDeck);
        console.log('deck', newDeck);
        setCardAddedToDeck({
          cardAdded: info?.id,
        });
      }

      if (info === loadedCardInfo) {
        const newLoadedDeck = [...loadDeck, loadedCardInfo];
        setLoadDeck(newLoadedDeck);
        console.log('loadDeck', newLoadedDeck);
        setCardAddedToDeck({
          cardAdded: info?.id,
        });
      }
    } else {
      console.log("You can't add more than 3 of the same card to your deck");
    }
  };

  const determineCardForRemove = (info, currentlyEditingDeck) => {
    const deck = currentlyEditingDeck ? loadDeck : cardInfo;
    // const setDeck = currentlyEditingDeck ? setLoadDeck : setDeck;

    const updatedDeck = deck.filter((card) => card?.id !== info?.id);
    if (updatedDeck.length !== deck.length) {
      setDeck(updatedDeck);
    } else {
      console.log("You can't remove a card that isn't in your deck");
    }
  };

  // Determine which cardInfo to use
  const info = currentlyEditingDeck ? loadedCardInfo : cardInfo;
  const src =
    info === cardInfo
      ? cardInfo?.card_images[0]?.image_url
      : loadedCardInfo?.card_images?.image_url;
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{info?.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Image src={src} aspectRatio={2 / 3} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => onAddClick(info)}
            >
              Add to Deck
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => determineCardForRemove(info, currentlyEditingDeck)}
            >
              Remove
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" my={1}>
              <FaLevelUpAlt />{' '}
              <Typography variant="h6"> Level: {info?.level}</Typography>
            </Box>
            <Box display="flex" alignItems="center" my={1}>
              <FaVenusMars />{' '}
              <Typography variant="h6">Type: {info?.type}</Typography>
            </Box>
            <Box display="flex" alignItems="center" my={1}>
              <FaDragon />{' '}
              <Typography variant="h6">Race: {info?.race}</Typography>
            </Box>
            <Box display="flex" alignItems="center" my={1}>
              <FaRegLightbulb />{' '}
              <Typography variant="h6">Attribute: {info?.attribute}</Typography>
            </Box>
            <Box display="flex" alignItems="center" my={1}>
              <Typography variant="h6">ATK: {info?.atk}</Typography>
            </Box>
            <Box display="flex" alignItems="center" my={1}>
              <FaShieldAlt />{' '}
              <Typography variant="h6">DEF: {info?.def}</Typography>
            </Box>
            <Box display="flex" alignItems="center" my={1}>
              <FaRegCopy />{' '}
              <Typography variant="h6">
                Description: {info?.description}
              </Typography>
            </Box>
            <Typography>{cardInfo?.desc}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <Dialog open={isAlertOpen} onClose={handleAlertClose}>
        <DialogTitle>Start a new deck</DialogTitle>
        <DialogContent>
          <Alert severity="info">
            <AlertTitle>Start a new deck</AlertTitle>
            Would you like to start a new deck?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button ref={cancelRef} onClick={handleAlertClose}>
            No
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleConfirmNewDeck(info)}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default CardModal;
