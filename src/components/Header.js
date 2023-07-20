//! src/components/Header.js
import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import CartModal from './CartModal';


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
  // State to manage the cart modal open/closed status
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Function to handle cart icon click and toggle the cart modal state
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
            <Link to="/products">Product Listings</Link>
          </li>
          <li>
            <Link to="/products/:productId">Product Details</Link>
          </li>
          <li>
            {/* Use an onClick handler to toggle the cart modal */}
            <Link to="/cart" onClick={handleCartIconClick}>
              {/* Emoji icon */}
              🛒
            </Link>
          </li>
        </ul>
      </nav>
      {/* Render the CartModal component based on the isCartModalOpen state */}
      {isCartModalOpen && <CartModal onClose={handleCartIconClick} />}
      {/* Pass the onClose function to CartModal to close the modal when needed */}
      <CartIcon />
    </HeaderWrapper>
  );
};


export default Header;







