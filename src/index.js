import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { Provider } from 'react-redux';
import AuthProvider, { AuthContext } from './context/Auth/authContext';
import CartProvider from './context/CartContext/CartContext';
import store from './store/store';
import { CardStoreProvider } from './context/CartContext/CardStore';

const root = document.getElementById('root');

function Main() {
  return (
    <CardStoreProvider>
      <CartProvider>
        <Provider store={store}>
          <AuthProvider>
            <GlobalStyles />
            <App />
          </AuthProvider>
        </Provider>
      </CartProvider>
    </CardStoreProvider>
  );
}

ReactDOM.render(<Main />, root);
