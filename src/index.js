import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import GlobalStyles from './styles/GlobalStyles';
import store from './store';
import { Provider } from 'react-redux';
import AuthProvider from './context/Auth/authContext';

const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <GlobalStyles />
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

// reportWebVitals();
