// import {
//   Select,
//   MenuItem,
//   Input,
//   Box,
//   Grid,
//   Container,
//   Button,
// } from '@mui/material';
// import { useReducer } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Cards from '../cards/Cards';
// import config from '../../config/config';
// import {
//   getAllCards,
//   getCardByName,
//   getCardByType,
//   getCardByAttribute,
// } from '../../store/cards/cards';

// const apiUrl = config.apiUrl;

// const initialState = {
//   name: '',
//   race: '',
//   type: '',
//   attribute: '',
//   level: '',
// };

// function reducer(state, { field, value }) {
//   return {
//     ...state,
//     [field]: value,
//   };
// }

// const Search = ({ setCards, ...props }) => {
//   const dispatch = useDispatch();
//   const [state, dispatchState] = useReducer(reducer, initialState);
//   const cards = useSelector((state) => state.cards);

//   const request = async () => {
//     dispatch({ type: 'SET_LOADING_STATE', payload: true });
//     try {
//       if (state.name) {
//         await dispatch(getCardByName(state.name));
//       } else if (state.type) {
//         await dispatch(getCardByType(state.type));
//       } else if (state.attribute) {
//         await dispatch(getCardByAttribute(state.attribute));
//       } else {
//         await dispatch(getAllCards());
//       }
//       dispatch({ type: 'SET_LOADING_STATE', payload: false });
//     } catch (err) {
//       console.log(err);
//       dispatch({ type: 'SET_LOADING_STATE', payload: false });
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       request();
//     }
//   };

//   const handleChange =
//     (name) =>
//     ({ target: { value } }) => {
//       dispatchState({
//         field: name,
//         value: value.toLowerCase() === 'unset' ? '' : value,
//       });
//     };

//   const CustomSelector = ({ values, name }) => (
//     <Select defaultValue="Unset" onChange={handleChange(name)}>
//       {values.map((value) => (
//         <MenuItem key={value} value={value}>
//           {value}
//         </MenuItem>
//       ))}
//     </Select>
//   );

//   const levels = [
//     'Unset',
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9',
//     '10',
//     '11',
//     '12',
//   ];
//   const races = ['Unset', 'Aqua', 'Beast' /*...your other races*/];
//   const types = [
//     'Unset',
//     'Effect Monster',
//     'Flip Effect Monster' /*...your other types*/,
//   ];
//   const attributes = [
//     'Unset',
//     'Dark',
//     'Divine',
//     'Earth',
//     'Fire',
//     'Light',
//     'Water',
//     'and',
//     'Wind',
//   ];

//   return (
//     <Box sx={{ overflowY: 'scroll', height: '100vh', borderRadius: 'lg' }}>
//       <Container sx={{ py: 5 }}>
//         <Input
//           type="text"
//           placeholder="Type card name"
//           onChange={(event) =>
//             dispatchState({ field: 'name', value: event.target.value })
//           }
//           onKeyDown={handleKeyDown}
//         />
//         <CustomSelector values={levels} name="level" />
//         <CustomSelector values={races} name="race" />
//         <CustomSelector values={types} name="type" />
//         <CustomSelector values={attributes} name="attribute" />

//         <Button onClick={request}>Search</Button>

//         <Grid container spacing={10}>
//           {cards &&
//             cards.map(
//               (card, index) =>
//                 index < cards.length - 1 && (
//                   <Cards
//                     key={index}
//                     cards={cards}
//                     cardInfo={cards[index + 1]}
//                     index={index}
//                     {...props}
//                   />
//                 )
//             )}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Search;
