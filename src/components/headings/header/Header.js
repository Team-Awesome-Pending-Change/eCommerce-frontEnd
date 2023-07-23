import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth/authContext';
import logo from '../../../assets/navlogo.png';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import MenuItems from './MenuItems';

const HeaderWrapper = styled(AppBar)`
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const ToolbarWrapper = styled(Toolbar)`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    .desktopMenuItems {
      display: none;
    }
  }

  @media (min-width: 769px) {
    .mobileMenuIcon {
      display: none;
    }

    .desktopMenuItems {
      display: flex;
    }
  }
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleDrawerOpen = () => setIsOpen(true);
  const handleDrawerClose = () => setIsOpen(false);
  const handleCartIconClick = () => setIsCartModalOpen(!isCartModalOpen);

  return (
    <HeaderWrapper position="static">
      <ToolbarWrapper>
        <div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            className="mobileMenuIcon"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            <Link to="/home" style={{ color: '#fff' }}>
              <img src={logo} alt="Logo" style={{ height: '3em' }} />
            </Link>
          </Typography>
        </div>
        <div>
          <Drawer anchor="right" open={isOpen} onClose={handleDrawerClose}>
            <MenuItems
              isLoggedIn={isLoggedIn}
              handleCartIconClick={handleCartIconClick}
              isCartModalOpen={isCartModalOpen}
              logout={logout}
              handleDrawerClose={handleDrawerClose}
            />
          </Drawer>
          <div className="desktopMenuItems">
            <MenuItems
              isLoggedIn={isLoggedIn}
              handleCartIconClick={handleCartIconClick}
              isCartModalOpen={isCartModalOpen}
              logout={logout}
              handleDrawerClose={handleDrawerClose}
            />
          </div>
        </div>
      </ToolbarWrapper>
    </HeaderWrapper>
  );
}

export default Header;
