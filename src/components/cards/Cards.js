import { useState } from 'react';
import { Grid, Tooltip, Dialog, DialogContent } from '@mui/material';
import placeholderImage from '../../assets/placholder.jpeg';
import CardModal from '../modals/CardModal';

const Cards = ({
  cardInfo,
  loadedCardInfo,
  cardAddedToDeck,
  setCardAddedToDeck,
  setDeckCards,
  safeDeck,
  deckCards,
  setCurrentlyEditingDeck,
  currentlyEditingDeck,
  cards,
  loadDeck,
  setLoadDeck,
  loadedCards,
  deckData,
  loadDeckCards,
  deck,
  setDeck,
}) => {
  const [open, setOpen] = useState(false);

  const imgUrl = cardInfo?.card_images[0]?.image_url_small || '';
  const loadedImgUrl = loadDeckCards?.card_images?.image_url_small || '';

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    handleClickOpen();
  };

  const tooltipDisplay = (cardData) => (
    <Tooltip
      title={`
        ${cardInfo?.name ? `Name: ${cardInfo.name}` : ''}
        ${cardInfo?.level ? `LV: ${cardInfo.level}` : ''}
        ${cardInfo?.type ? `Type: ${cardInfo.type}` : ''}
        ${cardInfo?.race ? `Race: ${cardInfo.race}` : ''}
        ${cardInfo?.attribute ? `Attribute: ${cardInfo.attribute}` : ''}
        ${cardInfo?.atk ? `ATK: ${cardInfo.atk}` : ''}
        ${cardInfo?.def ? `DEF: ${cardInfo.def}` : ''}
        ${cardInfo?.desc ? `Description: ${cardInfo.desc}` : ''}
      `}
      arrow
    >
      <img
        src={imgUrl || placeholderImage}
        width="90px"
        height="120px"
        alt="Card"
        onClick={handleClick}
      />
    </Tooltip>
  );

  const dialogDisplay = (cardData) => (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <CardModal
          cardInfo={cardInfo}
          safeDeck={safeDeck}
          loadDeck={loadDeck}
          setDeckCards={setDeckCards}
          setCurrentlyEditingDeck={setCurrentlyEditingDeck}
          currentlyEditingDeck={currentlyEditingDeck}
          setLoadDeck={setLoadDeck}
          loadedCards={loadedCards}
          cards={cards}
          loadedCardInfo={loadedCardInfo}
          cardAddedToDeck={cardAddedToDeck}
          setCardAddedToDeck={setCardAddedToDeck}
          deck={deck}
          setDeck={setDeck}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <Grid item>
      {cardInfo && (
        <div>
          {tooltipDisplay(cardInfo)}
          {dialogDisplay(cardInfo)}
        </div>
      )}
      {loadedCardInfo && (
        <div>
          {tooltipDisplay(loadedCardInfo)}
          {dialogDisplay(loadedCardInfo)}
        </div>
      )}
    </Grid>
  );
};

export default Cards;
