//! src/pages/ProductListing.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../products';


const ProductListing = () => {
  return (
    <div className="product-listing">
      <h2>Product Listing</h2>
      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;







