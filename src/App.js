// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@mui/material/styles';

import Header from './components/headings/header/Header';
import Footer from './components/headings/footer/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import theme from './styles/themes';
import GlobalStyles from './styles/GlobalStyles';
import CartPage from './pages/Cart';
import store from './store/index';

// import ProductDetail from "./pages/ProductDetail";
// import Cancel from "./pages/Cancel";
// import Success from "./pages/Success";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Helmet>
          {/* This just makes the google font global */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/store" element={<Store />} />
            <Route exact path="/cart" element={<CartPage />} />
            {/* <Route exact path="/deckbuilder" element={<DeckBuilder />} /> */}
            {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}
            {/* <Route path="/cancel" element={<Cancel />} />}
            {/* <Route path="/success" element={<Success />} /> */}
          </Routes>
          <Footer />
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
