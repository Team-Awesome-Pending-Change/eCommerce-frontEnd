// ! src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import ProductCard from "./components/ProductCard";
import Store from "./pages/Store";
import theme from "./styles/themes";
import GlobalStyles from "./styles/GlobalStyles";
// import ProductDetail from "./pages/ProductDetail";
// import Cancel from "./pages/Cancel";
// import Success from "./pages/Success";



const App = () => {
  return (
    <Router>
      <Helmet>
        {/* This just makes the google font global */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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

        <Route exact path="/store" element={<Store />} />

        {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}
        {/* <Route path="/cancel" element={<Cancel />} />
        <Route path="/success" element={<Success />} /> */}
      </Routes>
      <Footer />
      </ThemeProvider>
    </Router>
  );
};


export default App;



