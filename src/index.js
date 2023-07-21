// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';
import store from './store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <>
  {/* had to invoke this here to fix an error? not sure if this is correct
   */}
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
  </>
);






