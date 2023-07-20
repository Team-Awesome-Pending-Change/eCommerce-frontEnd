// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/products/:productId" component={ProductDetail} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
