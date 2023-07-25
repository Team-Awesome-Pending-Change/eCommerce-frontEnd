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
// import {
//   getAllCards,
//   getCardByAttribute,
//   getCardByName,
//   getCardByType,
// } from '../../store/reducers/card';
import ProductCard from '../cards/ProductCard';
import axios from 'axios';
import { updateCardData, updateCardState } from '../../store/reducers/cart';

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
  const dispatch = useDispatch();
  const [searchParams, dispatchState] = useReducer(reducer, initialState);
  // const cards = useSelector((state) => state.cards);
  const handleRequest = async () => {
    dispatch({ type: 'SET_LOADING_STATE', payload: true });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cards/ygopro`,
        searchParams
      );

      if (response.data.data) {
        const cards = response.data.data;
        setFilteredCards(cards);

        // dispatch actions to update cardState and cardData in Redux state
        dispatch(updateCardState(cards));
        dispatch(updateCardData(cards));
      } else {
        setFilteredCards([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: 'SET_LOADING_STATE', payload: false });
    }
  };

  // const handleRequest = async () => {
  //   dispatch({ type: 'SET_LOADING_STATE', payload: true });
  //   try {
  //     let results;
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_SERVER}/api/cards/ygopro`,
  //       searchParams
  //     );
  //     console.log(response.data);
  //     if (searchParams.name) {
  //       results = await dispatch(getCardByName(searchParams.name));
  //     } else if (searchParams.type) {
  //       results = await dispatch(getCardByType(searchParams.type));
  //     } else if (searchParams.attribute) {
  //       results = await dispatch(getCardByAttribute(searchParams.attribute));
  //     } else {
  //       results = await dispatch(getAllCards());
  //     }
  //     console.log('params: ', searchParams);
  //     if (response.data) {
  //       setFilteredCards(response.data.data);
  //     } else {
  //       setFilteredCards([]);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     dispatch({ type: 'SET_LOADING_STATE', payload: false });
  //   }
  // };

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
  console.log('filteredCards: ', filteredCards);
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
  console.log('filteredCards: ', filteredCards);
  return (
    <Box
      sx={{ padding: 2, overflowY: 'scroll', height: '20vh', borderRadius: 2 }}
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
  );
};

export default SearchBar;
