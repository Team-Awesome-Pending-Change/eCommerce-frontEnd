//! src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';


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
  return (
    <HeaderWrapper>
      <h1>Mythical Card-Mart</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Product Details</Link>
          </li>
          {/* Add other links as needed */}
          <li>
            <Link to="/cart">
              {/* Emoji icon */}
              🛒
            </Link>
          </li>
        </ul>
      </nav>
      <CartIcon />
    </HeaderWrapper>
  );
};


export default Header;







