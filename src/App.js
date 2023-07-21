//! src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProductListing from "./pages/ProductListing";
import Stripe from "./components/Stripe";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";



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
      <Header />
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/products/:productId" component={ProductDetail} />
        <Route path="/products" component={ProductListing} />
        <Route path="/cancel" component={Cancel} />
        <Route path="/success" component={Success} />
      </Routes>
      <Stripe/>
      <Footer />
    </Router>
  );
};


export default App;



