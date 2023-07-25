import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { Provider } from 'react-redux';
import AuthProvider, { AuthContext } from './context/Auth/authContext';
import { CartProvider } from './context/CartContext/CartContext';
import store from './store/store';

const root = document.getElementById('root');

function Main() {
  return (
    <Provider store={store}>
      <CartProvider>
        <AuthProvider>
          <GlobalStyles />
          <App />
        </AuthProvider>
      </CartProvider>
    </Provider>
  );
}

ReactDOM.render(<Main />, root);
