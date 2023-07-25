import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import CartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Login from '../../Auth/login';

import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
// import CartModal from '../../modals/CartModal';
// import Stripe from '../../Stripe';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import DeckOfCardsIcon from './DeckOfCardsIcon';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.2em',
    fontWeight: 500,
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  },
}));

function MenuItems({
  isLoggedIn,
  handleCartIconClick,
  isCartModalOpen,
  logout,
  handleDrawerClose,
}) {
  return (
    <>
      <StyledMenuItem key="home">
        <Link to="/home" style={{ color: '#000', textDecoration: 'none' }}>
          <HomeIcon /> Home
        </Link>
      </StyledMenuItem>
      {isLoggedIn && (
        <StyledMenuItem key="store">
          <Link to="/store" style={{ color: '#000', textDecoration: 'none' }}>
            <StoreIcon /> Store
          </Link>
        </StyledMenuItem>
      )}
      {isLoggedIn && (
        <StyledMenuItem key="deckbuilder">
          <Link
            to="/deckbuilder"
            style={{ color: '#000', textDecoration: 'none' }}
          >
            <DeckOfCardsIcon /> Deck Builder
          </Link>
        </StyledMenuItem>
      )}
      <StyledMenuItem onClick={handleCartIconClick} key="cart">
        <Link to="/cart" style={{ color: '#000', textDecoration: 'none' }}>
          <CartIcon /> Cart
        </Link>
        {/* <CartModal isOpen={isCartModalOpen} onClose={handleCartIconClick}> */}
        {/* <Stripe /> */}
        {/* </CartModal> */}
      </StyledMenuItem>
      {isLoggedIn && (
        <StyledMenuItem key="profile">
          <Link
            to="/userprofile"
            style={{ color: '#000', textDecoration: 'none' }}
          >
            <AccountCircleIcon /> User Profile
          </Link>
        </StyledMenuItem>
      )}
      {isLoggedIn ? (
        <Button variant="outlined" onClick={logout} endIcon={<LogoutIcon />}>
          Logout
        </Button>
      ) : (
        <Dialog open={!isLoggedIn} onClose={handleDrawerClose}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <Login />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDrawerClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDrawerClose} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default MenuItems;
