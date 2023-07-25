import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import cartSlice, {
  handleAddToCart,
  removeCardFromCartAsync,
} from '../../store/cart';

function SimpleCart() {
  const { toggleCartVisibility, changeCardQuantity } = cartSlice.actions;

  const cartState = useSelector((storefrontState) => storefrontState.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = async (product) => {
    try {
      await dispatch(removeCardFromCartAsync(product.key)).unwrap();
    } catch (error) {
      console.error('Failed to remove item from cart: ', error);
    }
  };

  const handleModifyItemInCart = async (event, product) => {
    const quantityChange = parseInt(event.target.value);

    try {
      await dispatch(
        changeCardQuantity({
          id: product.key,
          quantityChange: quantityChange,
        })
      );
    } catch (error) {
      console.error('Failed to adjust quantity in cart: ', error);
    }
  };

  const handleToggleCart = () => {
    dispatch(toggleCartVisibility());
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={cartState.cartVisible}
        onClose={handleToggleCart}
        PaperProps={{
          sx: {
            width: '15%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <div>
          {cartState.cart &&
            cartState.cart.map((item, index) => (
              <Container
                key={item.key || index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Typography variant="overline">
                  {item.name} x {item.quantity}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveItem(item)}
                  >
                    Remove
                  </Button>
                  <Box>
                    <Button
                      variant="contained"
                      value={1}
                      onClick={(event) => handleModifyItemInCart(event, item)}
                    >
                      +
                    </Button>
                    <Button
                      variant="contained"
                      value={-1}
                      onClick={(event) => handleModifyItemInCart(event, item)}
                    >
                      -
                    </Button>
                  </Box>
                </Box>
              </Container>
            ))}
        </div>

        <Button
          variant="contained"
          onClick={() => {
            console.log(
              'https://imgflip.com/s/meme/Shut-Up-And-Take-My-Money-Fry.jpg'
            );
          }}
          style={{ padding: '0' }}
        >
          <Link
            to="/cart"
            style={{ width: '100%', padding: '0.5rem' }}
            state={{ cart: cartState }}
          >
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <Typography align="center" variant="button">
                Checkout
              </Typography>
              <Typography align="center" variant="caption">
                SubTotal: $
                {cartState.totalAmount
                  ? cartState.totalAmount.toFixed(2)
                  : '0.00'}
              </Typography>
            </Box>
          </Link>
        </Button>
      </Drawer>
    </React.Fragment>
  );
}

export default SimpleCart;
