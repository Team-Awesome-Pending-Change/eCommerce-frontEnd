import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProductCard from '../components/cards/ProductCard';
import { addProductToCart } from '../store/cart'; // import your addToCart action
import { loadProductsFromAPI } from '../store/products'; // import the action to load products

const StoreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f7f7f7;
`;

const StoreTitle = styled.h2`
  grid-column: span 3;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Store = () => {
  const products = useSelector((state) => state.productData.productList); // select products from Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsFromAPI());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addProductToCart(product)); // dispatch addToCart action
  };

  return (
    <StoreContainer>
      <StoreTitle>Store</StoreTitle>
      {products &&
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={() => handleAddToCart(product)}
          />
        ))}
    </StoreContainer>
  );
};

export default Store;
