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
// import { loadSavedCards } from './store/reducers/cart';
// import { AuthContext } from './context/Auth/authContext';

const App = () => {
  // const user = useContext(AuthContext);
  // const dispatch = useDispatch();
  // const [cookies, setCookie, removeCookie] = useCookies(['userCookie']);
  // console.log(cookies['userCookie']); // get a cookie

  const [activeUserCartId, setActiveUserCartId] = useState(null);

  // console.log('user', user);

  // useEffect(() => {
  //   const userId = cookies.userCookie;
  //   if (userId) {
  //     dispatch(loadSavedCards(userId));
  //   }
  // }, [dispatch, cookies.userCookie]);

  // const getAllCartsAndFindUserCart = async () => {
  //   try {
  //     const userId = cookies.userCookie;
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_SERVER}/api/carts`
  //     );

  //     if (response.data && response.data.length > 0) {
  //       const userCart = response.data.find((cart) => cart.userId === userId);
  //       if (userCart) {
  //         return userCart.id;
  //       } else {
  //         const createResponse = await axios.post(
  //           `${process.env.REACT_APP_SERVER}/api/carts`,
  //           { userId }
  //         );
  //         return createResponse.data.id;
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error while fetching/creating the user cart', error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   const fetchCartId = async () => {
  //     const cartId = await getAllCartsAndFindUserCart();
  //     setActiveUserCartId(cartId);
  //   };

  //   fetchCartId();
  // }, []);

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
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
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
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
