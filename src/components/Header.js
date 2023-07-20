// src/components/Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>E-Commerce App</h1>
    </HeaderWrapper>
  );
};

export default Header;
