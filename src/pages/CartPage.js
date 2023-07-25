// import React, { useEffect, useState, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Cookies } from 'react-cookie';
// import {
//   Box,
//   Card as CardElement,
//   CardContent,
//   Container,
// } from '@mui/material';
// import { asyncActions, changeCardQuantity } from '../store/reducers/cart';
// import CartContent from '../components/content/CartContent';
// import CustomerForm from '../components/forms/CustomerForm';

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const cookies = new Cookies();
//   const user = cookies.get('userCookie');
//   const userId = user?.id;

//   const cartData = useSelector((state) => state.cart) || [];
//   const cartState =
//     useSelector((storefrontState) => storefrontState.cart) || {};

//   useEffect(() => {
//     if (userId) {
//       dispatch(asyncActions.fetchCart({ userId }));
//       if (cartState.cart && cartState.cart.length > 0) {
//         dispatch(
//           asyncActions.pushToServerCart({ userId, cart: cartState.cart })
//         );
//       }
//     }
//   }, [dispatch, userId, cartState.cart]);

//   const handleModifyItemInCart = async (event, product, operation) => {
//     const quantityChange = parseInt(event.target.value);
//     if (isNaN(quantityChange)) return;

//     try {
//       if (operation === 'add') {
//         await dispatch(changeCardQuantity({ id: product.key, quantityChange }));
//       } else if (operation === 'remove') {
//         await dispatch(asyncActions.removeFromCart({ id: product.key }));
//       }
//     } catch (error) {
//       console.error('Failed to adjust quantity in cart: ', error);
//     }
//   };

//   const calculateTotalPrice = useCallback(() => {
//     if (!Array.isArray(cartData)) {
//       console.error('cartData is not an array:', cartData);
//       return 0;
//     }

//     return cartData.reduce(
//       (total, item) =>
//         total +
//         (item.product_prices?.[0]?.tcgplayer_price || 0) * item.quantity,
//       0
//     );
//   }, [cartData]);

//   return (
//     <Container>
//       <Box
//         sx={{
//           marginTop: '2rem',
//           display: 'flex',
//           justifyContent: 'center',
//           flexGrow: '1',
//         }}
//       >
//         <CardElement sx={{ width: '90%', padding: '1rem' }}>
//           <CardContent>
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 flexGrow: '1',
//               }}
//             >
//               <Box sx={{ flex: 1, marginRight: '2rem' }}>
//                 {cartData && (
//                   <CartContent
//                     cartData={cartData}
//                     calculateTotalPrice={calculateTotalPrice}
//                     onQuantityChange={handleModifyItemInCart}
//                   />
//                 )}
//               </Box>
//               <Box sx={{ flex: 1 }}>
//                 <CustomerForm calculateTotalPrice={calculateTotalPrice} />
//               </Box>
//             </Box>
//           </CardContent>
//         </CardElement>
//       </Box>
//     </Container>
//   );
// };

// export default CartPage;
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeCardQuantity,
  fetchCart,
  pushToServerCart,
  asyncActions,
} from '../store/reducers/cart';
import { Cookies } from 'react-cookie';
import {
  Box,
  Card as CardElement,
  CardContent,
  Container,
} from '@mui/material';
import CartContent from '../components/content/CartContent';
import CustomerForm from '../components/forms/CustomerForm';

const CartPage = ({ activeUserCartId, setActiveUserCartId }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const user = cookies.get('userCookie');
  const userId = user?.id;

  // Fetching cart data from redux store
  const cartData = useSelector((state) => state.cart) || [];
  const cartState = useSelector((state) => state.cart) || {};
  console.log('cart state', cartState);

  const cartStatus = useSelector((state) => state.cartStatus);
  const cartError = useSelector((state) => state.cartError);

  // Local state variables to keep track of cart data
  const [fetchedCartId, setFetchedCartId] = useState(null);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(asyncActions.fetchCart({ userId }));
  //     if (cartState.cart && cartState.cart.length > 0) {
  //       dispatch(
  //         asyncActions.pushToServerCart({ userId, cart: cartState.cart })
  //       );
  //     }
  //   }
  // }, [dispatch, userId, cartState.cart]);
  useEffect(() => {
    dispatch(asyncActions.fetchAllCarts());
  }, [dispatch]);

  console.log('cartData', cartData);

  const handleModifyItemInCart = async (event, product, operation) => {
    const quantityChange = parseInt(event.target.value);
    if (isNaN(quantityChange)) {
      return;
    }
    try {
      if (operation === 'add') {
        await dispatch(
          changeCardQuantity({
            id: product.key,
            quantityChange: quantityChange,
          })
        );
      } else if (operation === 'remove') {
        await dispatch(asyncActions.removeFromCart({ id: activeUserCartId }));
      }
    } catch (error) {
      console.error('Failed to adjust quantity in cart: ', error);
    }
  };

  const calculateTotalPrice = useCallback(() => {
    if (!Array.isArray(cartData)) {
      console.error('cartData is not an array:', cartData);
      return 0;
    }
    return cartData.reduce(
      (total, item) =>
        total +
        (item.product_prices &&
        Array.isArray(item.product_prices) &&
        item.product_prices.length > 0 &&
        item.product_prices[0].tcgplayer_price
          ? item.product_prices[0].tcgplayer_price
          : 0) *
          (item.quantity || 0),
      0
    );
  }, [cartData]);

  if (cartStatus === 'loading') {
    return <div>Loading...</div>;
  } else if (cartStatus === 'failed') {
    return <div>Error: {cartError}</div>;
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          flexGrow: '1',
        }}
      >
        <CardElement sx={{ width: '90%', padding: '1rem' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexGrow: '1',
              }}
            >
              <Box sx={{ flex: 1, marginRight: '2rem', flexGrow: '1' }}>
                {cartData && (
                  <CartContent
                    cartData={cartData}
                    calculateTotalPrice={calculateTotalPrice}
                    onQuantityChange={handleModifyItemInCart}
                  />
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <CustomerForm calculateTotalPrice={calculateTotalPrice} />
              </Box>
            </Box>
          </CardContent>
        </CardElement>
      </Box>
    </Container>
  );
};

export default CartPage;
