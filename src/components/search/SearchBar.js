import {
  Select,
  MenuItem,
  Input,
  Box,
  Grid,
  Container,
  Button,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import ProductCard from '../cards/ProductCard';
import axios from 'axios';
import {
  CardStoreProvider,
  useCardStore,
} from '../../context/CartContext/CardStore.js'; // import CardStoreProvider

const initialState = {
  name: '',
  race: '',
  type: '',
  attribute: '',
  level: '',
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const SearchBar = ({ filteredCards, setFilteredCards, ...props }) => {
  const [searchParams, dispatchState] = useReducer(reducer, initialState);
  const { setCardsArray } = useCardStore();

  const handleRequest = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cards/ygopro`,
        searchParams
      );

      if (response.data.data) {
        const cards = response.data.data;
        setFilteredCards(cards);

        // Use the CardStore context's function to update cardsArray
        setCardsArray(cards);
      } else {
        setFilteredCards([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    const randomCardData = filteredCards[randomIndex];
    return randomCardData;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleRequest();
    }
  };

  const levels = [
    'Unset',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  const races = ['Unset', 'Aqua', 'Beast'];
  const types = ['Unset', 'Effect Monster', 'Flip Effect Monster'];
  const attributes = [
    'Unset',
    'Dark',
    'Divine',
    'Earth',
    'Fire',
    'Light',
    'Water',
    'Wind',
  ];

  const handleChange =
    (name) =>
    ({ target: { value } }) => {
      dispatchState({
        field: name,
        value: value.toLowerCase() === 'unset' ? '' : value,
      });
    };

  const renderCustomSelector = (label, name, values) => (
    <Grid item xs={12} sm={6} md={3}>
      <FormControl fullWidth variant="filled">
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          labelId={name}
          defaultValue="Unset"
          onChange={handleChange(name)}
        >
          {values.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );

  return (
    // <CardStoreProvider searchParams={searchParams}>
    <Box
      sx={{
        padding: 2,
        overflowY: 'scroll',
        height: '20vh',
        borderRadius: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Search Cards
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              fullWidth
              placeholder="Type card name"
              onChange={handleChange('name')}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          {renderCustomSelector('Level', 'level', levels)}
          {renderCustomSelector('Race', 'race', races)}
          {renderCustomSelector('Type', 'type', types)}
          {renderCustomSelector('Attribute', 'attribute', attributes)}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRequest}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {Array.isArray(filteredCards) &&
            filteredCards.map((card, index) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <ProductCard cardInfo={card} index={index} {...props} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
    // </CardStoreProvider>
  );
};

export default SearchBar;
