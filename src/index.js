// import React from 'react';
// import { createRoot } from 'react-dom/client'; // corrected import
// import './index.css';
// import App from './App';
// import GlobalStyles from './styles/GlobalStyles';
// import store from './store';
// import { Provider } from 'react-redux';
// import AuthProvider from './context/Auth/authContext';

// const root = document.getElementById('root');
// createRoot(root).render(
//   // <React.StrictMode>
//   <AuthProvider>
//     <Provider store={store}>
//       <GlobalStyles />
//       <App />
//     </Provider>
//   </AuthProvider>
//   // </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom'; // updated import
import './index.css';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';
import store from './store';
import { Provider } from 'react-redux';
import AuthProvider from './context/Auth/authContext';
import { CartProvider } from './context/CartContext/CartContext';

const root = document.getElementById('root');

ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <Provider store={store}>
        <GlobalStyles />
        <App />
      </Provider>
    </CartProvider>
  </AuthProvider>,
  root
);
