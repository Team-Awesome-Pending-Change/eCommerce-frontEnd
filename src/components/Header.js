import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartIcon from './CartIcon';
import CartModal from './CartModal';
import Stripe from './Stripe';

const HeaderWrapper = styled.header`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;

    li {
      margin-left: 1rem;

      a {
        color: #fff;
        text-decoration: none;

        &:hover {
          color: #e0e0e0;
        }
      }
    }
  }
`;

const Header = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleCartIconClick = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  return (
    <HeaderWrapper>
      <h1>Mythical Card-Mart</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>

            <Link to="/store" >Store</Link>
          </li>
          <li>
            <Link to="/cart" onClick={handleCartIconClick}>

              {/* Emoji icon */}
              🛒
            </Link>
          </li>
        </ul>
      </nav>
      <CartIcon />
      <CartModal isOpen={isCartModalOpen} onClose={handleCartIconClick}>
         {/* Render the Stripe component inside the CartModal  */}
        <Stripe />
      </CartModal>
    </HeaderWrapper>
  );
};

export default Header;
