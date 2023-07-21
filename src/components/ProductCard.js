// //! src/components/ProductCard.js
// import React, { useEffect, useState } from 'react';
// // import styled from 'styled-components';
// import axios from 'axios';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';


// const ProductCard = ({ cards }) => {

//   return (
//     <>
//       {/* card.length > 0 & Array.isArray(card) both work to prevent the map from firing immediately while the array is empty which causes error*/}
//       {cards.length > 0 && cards.data.map((card) => (
//         <Card key={card.id}>
//           <CardMedia
//             component="img"
//             alt={card.name}
//             image={card.card_images?.[0]?.image_url_small} />
//           <CardContent>
//             <Typography variant="h2" component="div">
//               {card.name}
//             </Typography>
//             <Typography variant="body2">{card.card_rices?.[0]?.tcgplayer_price}</Typography>
//           </CardContent>
//             {/* View Product Details button down here and add to deck(stretch goal)*/}
//           <CardActions>
//             <Button size="small">Product Details</Button>
//             <Button size="small">Add to Deck Builder</Button>
//           </CardActions>
//         </Card>
//       ))}
//     </>
//   );
// };


// export default ProductCard;








