// //! src/pages/Cart.js
// import React from 'react';

// const CartPage = ({ cartItems }) => {
// const cartContainerStyle = {
// display: 'flex',
// flexDirection: 'column',
// alignItems: 'center',
// marginTop: '20px',
// };

// const cartItemStyle = {
// display: 'flex',
// justifyContent: 'space-between',
// alignItems: 'center',
// width: '80%',
// marginBottom: '10px',
// };

// const imageStyle = {
// width: '100px',
// height: '150px',
// marginRight: '10px',
// };

// const totalPriceStyle = {
// fontWeight: 'bold',
// marginTop: '20px',
// };

// const calculateTotalPrice = () => {
// return cartItems.reduce((total, item) => total + item.price, 0);
// };

// return (
// <div style={cartContainerStyle}>
// <h2>Cart</h2>
// {cartItems.length > 0 ? (
// cartItems.map((item) => (
// <div key={item.id} style={cartItemStyle}>
// <img src={item.image} alt={item.name} style={imageStyle} />
// <div>
// <p>{item.name}</p>
// <p>Price: ${item.price}</p>
// </div>
// </div>
// ))
// ) : (
// <p>Your cart is empty.</p>
// )}
// {cartItems.length > 0 && (
// <p style={totalPriceStyle}>Grand Total: ${calculateTotalPrice()}</p>
// )}
// </div>
// );
// };

// export default CartPage;









