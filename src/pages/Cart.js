import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartAsync, fetchAllCartsAsync } from '../store/cart';
import './CartPage.css'; // import css file
import { CartContext } from '../context/CartContext/CartContext';
import { Cookies } from 'react-cookie';
import {
  Card as CardElement,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Create instance of Cookies
const cookies = new Cookies();

const user = cookies.get('userCookie'); // Use the instance to get the cookie
const userId = user.id;

function CustomTextField({ id = 'outlined', label, type }) {
  return <TextField id={id} label={label} type={type} />;
}

const CartPage = () => {
  const isCartVisible = useSelector((state) => state.cart.cartVisible);
  const { cart: cartItems, setAllCarts } = useContext(CartContext);
  const allCarts = useSelector((state) => state.cart.allCarts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCartsAsync());
  }, [dispatch]);

  useEffect(() => {
    setAllCarts(allCarts);
  }, [allCarts, setAllCarts]);

  useEffect(() => {
    const userCart = allCarts.find((cart) => cart.userId === userId);
    if (userCart) {
      dispatch(fetchCartAsync(userCart.id));
    }
  }, [dispatch, allCarts, userId]);

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.totalPrice, 0);

  // Only render if cart is visible
  if (!isCartVisible) return null;

  return (
    <CardElement>
      <CardContent>
        <h2>Your Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Box key={item.id}>
              <CardElement sx={{ margin: '0.5rem' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body1">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body1">
                    Total Price: ${item.totalPrice}
                  </Typography>
                </CardContent>
              </CardElement>
            </Box>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        {cartItems.length > 0 && (
          <Box>
            <CardElement sx={{ margin: '0.5rem' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">Grand Total:</Typography>
                <Typography variant="h6">${calculateTotalPrice()}</Typography>
              </CardContent>
            </CardElement>
          </Box>
        )}
        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Customer Info
          </Typography>
          <form>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <CustomTextField label="First Name" />
                  <CustomTextField label="Last Name" />
                </Box>
                <CustomTextField label="Street Address" />
                <CustomTextField label="City" />
                <CustomTextField label="State" />
                <CustomTextField type="number" label="Zip" />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CustomTextField type="number" label="Card Number" />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                  </LocalizationProvider>
                  <CustomTextField type="number" label="CVV" />
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={(event) => {
                      event.preventDefault();
                      alert('Thank you for your purchase!');
                    }}
                  >
                    Submit Order
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </CardContent>
    </CardElement>
  );
};

export default CartPage;
