// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductListing from './pages/ProductListing';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/products/:productId" component={ProductDetail} />
        <Route path="/products" component={ProductListing} />
      </Routes>
      <Footer />
    </Router>
  );
};


export default App;







