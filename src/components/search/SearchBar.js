import {
  Select,
  MenuItem,
  Input,
  Box,
  Grid,
  Container,
  Button,
} from '@mui/material';
import { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../cards/ProductCard';
import {
  getAllCards,
  getCardByAttribute,
  getCardByName,
  getCardByType,
} from '../../store/cards/TryCard';

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

const SearchBar = ({ onSearch, ...props }) => {
  const dispatch = useDispatch();
  const [state, dispatchState] = useReducer(reducer, initialState);

  const cards = useSelector((state) => state.cards);

  const request = async () => {
    dispatch({ type: 'SET_LOADING_STATE', payload: true });
    try {
      let results;
      if (state.name) {
        results = await dispatch(getCardByName(state.name));
      } else if (state.type) {
        results = await dispatch(getCardByType(state.type));
      } else if (state.attribute) {
        results = await dispatch(getCardByAttribute(state.attribute));
      } else {
        results = await dispatch(getAllCards());
      }
      onSearch(results);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: 'SET_LOADING_STATE', payload: false });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      request();
    }
  };

  const handleChange =
    (name) =>
    ({ target: { value } }) => {
      dispatchState({
        field: name,
        value: value.toLowerCase() === 'unset' ? '' : value,
      });
    };

  const CustomSelector = ({ values, name }) => (
    <Select defaultValue="Unset" onChange={handleChange(name)}>
      {values.map((value) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );

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

  return (
    <Box sx={{ overflowY: 'scroll', height: '20vh', borderRadius: 'lg' }}>
      <Container sx={{ py: 5 }}>
        <Grid container spacing={2} alignItems="center" justifyContent={'left'}>
          <Grid item xs={12}>
            <Input
              type="text"
              placeholder="Type card name"
              onChange={handleChange('name')}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomSelector values={levels} name="level" />
          </Grid>
          <Grid item xs={3}>
            <CustomSelector values={races} name="race" />
          </Grid>
          <Grid item xs={3}>
            <CustomSelector values={types} name="type" />
          </Grid>
          <Grid item xs={3}>
            <CustomSelector values={attributes} name="attribute" />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={request}>Search</Button>
          </Grid>
        </Grid>

        <Grid container spacing={10}>
          {Array.isArray(cards) &&
            cards.map((card, index) => (
              <Cards key={card.id} cardInfo={card} index={index} {...props} />
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchBar;
