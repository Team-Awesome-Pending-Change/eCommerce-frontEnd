import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@mui/material/styles';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';

import Header from './components/headings/header/Header';
import Footer from './components/headings/footer/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import theme from './assets/styles/themes';
import CartPage from './pages/CartPage';

const App = () => {
  const [activeUserCartId, setActiveUserCartId] = useState(null);

  return (
    <Router>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Header data-testid="header" />
        <Routes>
          <Route exact path="/" element={<Home data-testid="home-page" />} />
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/store"
            element={
              <Store
                activeUserCartId={activeUserCartId}
                setActiveUserCart={setActiveUserCartId}
              />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <CartPage
                activeUserCartId={activeUserCartId}
                setActiveUserCart={setActiveUserCartId}
              />
            }
          />
        </Routes>
        {/* eslint-disable-next-line prettier/prettier */}
        <Footer data-testid="footer"/>
      </ThemeProvider>
    </Router>
  );
};

export default App;
