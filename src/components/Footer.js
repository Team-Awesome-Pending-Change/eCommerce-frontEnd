// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>&copy; {new Date().getFullYear()} Team Awesome-Pending-Change</p>
    </FooterWrapper>
  );
};

export default Footer;
